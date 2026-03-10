import { NextRequest, NextResponse } from 'next/server'
import admin from 'firebase-admin'

if (!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
        })
    })
}

const auth = admin.auth()

export async function LOGIN(req: NextRequest) {
    const {idToken} = await req.json()
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const expiresIn = 60 * 60 * 42 * 5 * 1000
        const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn})
        const response = NextResponse.json({success:true})

        response.cookies.set('session', sessionCookie, {
            maxAge: expiresIn / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV ==='production',
            sameSite: 'strict',
            path: '/'
        })
        return response;
    }
    catch (error){
        console.error("Verification error:", error)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
}