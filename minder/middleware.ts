import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl
    const sessionCookie = request.cookies.get('session')?.value

    const protectedRoutes = ['/', '/watchlist']

    if (!sessionCookie && protectedRoutes.some(route => url.pathname === route || url.pathname.startsWith(route))) {
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