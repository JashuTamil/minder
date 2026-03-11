'use client';

import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailLogin = async () => {
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const idToken = await userCredential.user.getIdToken()
            await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({idToken})
            })
        }
        catch (error) {
            console.error('Login error:', error)
        }
    }
    
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const userCredential = await signInWithPopup(auth, provider)
            const idToken = await userCredential.user.getIdToken()
            await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({idToken})
            })
        }
        catch (error) {
            console.error('Google login error:', error)
        }
    }

    const handleSignOut = async () => {
        await signOut(auth);
        await fetch('/api/auth/logout', {method: 'POST'})
    }

    return (
        <div>
            <h1>Login to MINDER</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleEmailLogin}>Login with Email</button>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </div>
    )

}