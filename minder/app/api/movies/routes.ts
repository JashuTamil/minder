import { NextResponse } from 'next/server';
import { getAuth, User } from "firebase/auth";


export async function GET_MOVIE_DATA() {
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
        
        const response = await fetch(`http://localhost:8000/api/v1/get/get_movies?${uid}`)

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