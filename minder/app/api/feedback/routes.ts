import { NextResponse } from 'next/server';
import { getAuth, User } from "firebase/auth";

export async function GET_USER_DATA() {
    try{
        const auth = getAuth()
        const user: User | null = auth.currentUser
        let uid: string = '';

        if (user){
            uid = user.uid;
        }
        else {
            console.log("No user is currently signed in, or auth object is initializing.")
        }
        
        

        const response = await fetch(`http://localhost:8000/api/v1/get/get_feedback/${uid}`)

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

        const auth = getAuth()
        const user: User | null = auth.currentUser
        let uid: string = '';

        if (user){
            uid = user.uid;
        }
        else {
            console.log("No user is currently signed in, or auth object is initializing.")
        }
        
        const params = new URLSearchParams({userID: uid})

        const response = await fetch('http://localhost:8000/api/v1/upload/send_feedback/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({clientData, params})
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