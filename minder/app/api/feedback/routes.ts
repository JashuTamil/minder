import { NextResponse } from 'next/server';

export async function GET() {
    try{
        const response = await fetch('http://127.0.0.1:8000/')
        const data = await response.json()
        console.log(data)
        return NextResponse.json(data)
    }
    catch(error){
        console.error("Error fetching from backend", error)
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
    }
}