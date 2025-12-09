import { NextResponse } from 'next/server';

export async function GET_MOVIE_DATA() {
    try{
        
        const response = await fetch('http://localhost:8000/api/v1/get/get_movies')

        if (!response.ok) {
            throw new Error(`External API responded with status: ${response.status}`);
        }

        const data = await response.json()
        return NextResponse.json(data)
    }
    catch(error){
        console.error("Error fetching from backend:", error)
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
    }
}