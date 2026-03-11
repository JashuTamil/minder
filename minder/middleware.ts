import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl
    const sessionCookie = request.cookies.get('session')?.value

    const isProtectedRoute =
    !url.pathname.startsWith('/login') &&
    !url.pathname.startsWith('/api');

    if (!sessionCookie && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (sessionCookie && url.pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ]
}