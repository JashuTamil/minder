import { NextRequest, NextResponse } from 'next/server'
import admin from 'firebase-admin'

console.log('Firebase Admin init attempt...');
console.log('Project ID exists?', !!process.env.FIREBASE_PROJECT_ID);
console.log('Client Email exists?', !!process.env.FIREBASE_CLIENT_EMAIL);
console.log('Private Key length?', process.env.FIREBASE_PRIVATE_KEY?.length || 0);

let auth: ReturnType<typeof admin.auth>;

try{
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
  console.log('Firebase Admin initialized successfully')
}
  auth = admin.auth()
}
catch (initError) {
  console.error("ADMIN INIT FAILED:", initError)
}


export async function POST(req: NextRequest) {

  let body;
  try {
    body = await req.json()
  }
  catch (e) {
    console.error('Failed to parse body:', e)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { idToken } = body

  if (!idToken){
    console.error('No idToken provided')
    return NextResponse.json({ error: 'Missing idToken' }, { status: 400 })
  }

  if (!auth){
    console.error('Auth not available, init failed!')
    return NextResponse.json({ error: 'Server config error' }, { status: 500 })
  }

  try {
    console.log('Verifying ID token...')
    await auth.verifyIdToken(idToken)

    console.log('Creating session cookie...')
    const expiresIn = 60 * 60 * 24 * 5 * 1000
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn })

    console.log('Session cookie created successfully!')

    const response = NextResponse.json({ success: true });
    response.cookies.set('session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })

    return response
  } catch (error: any) {
    console.error('Auth endpoint error:', {
      message: error.message,
      code: error.code,
      stack: error.stack?.split('\n').slice(0, 5).join('\n'), // first 5 lines only
    })

    return NextResponse.json(
      { error: 'Authentication failed', details: error.message || 'Unknown error' },
      { status: 500 }
    )

  }
}