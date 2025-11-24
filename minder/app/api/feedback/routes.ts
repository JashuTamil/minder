import { FeedbackType } from '@/app/types';
import { NextResponse } from 'next/server';

export async function GET() {
    try{
        
        const response = await fetch('http://localhost:8000/api/v1/get/get_feedback')

        if (!response.ok) {
            throw new Error(`External API responded with status: ${response.status}`);
        }

        const data = await response.json()
        const returnData = JSON.parse(data)
        return NextResponse.json(returnData)
    }
    catch(error){
        console.error("Error fetching from backend:", error)
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
    }
}