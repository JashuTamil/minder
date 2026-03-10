import { NextRequest, NextResponse } from 'next/server'

export async function LOGOUT(req: NextRequest) {
    const response = NextResponse.json({ success: true })
    response.cookies.delete('session')
    return response
}