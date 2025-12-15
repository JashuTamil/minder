import { NextResponse } from 'next/server';

export async function GET_USER_DATA() {
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

export async function SEND_USER_DATA(request: Request){
    const clientData = await request.json()

    try{
        const response = await fetch('http://localhost:8000/api/v1/upload/send_feedback/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        })

        if (!response.ok){
            throw new Error(`External API responded with status: ${response.status}`)
        }

        const responseData = await response.json()

        return NextResponse.json({
            status: 'success',
            processedData: responseData,
            message: 'Data successfully sent to backend.'
        })
    }

    catch(error){
        console.error("Error forwarding from backend:", error)
        return NextResponse.json({ error: 'Failed to forward' }, { status: 500 })
    }
}