'use client';

import { auth } from '../lib/firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();

    const handleEmailLogin = async () => {
        setError("")
        setEmailLoading(true);

        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const idToken = await userCredential.user.getIdToken()
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({idToken})
            })
            if (res.ok) {
            router.push('/'); // Redirect to home (middleware will handle it)
            } 
            else {
            setError('Login failed. Please try again.');
            }
        } 
        catch (err: any) {
            setError(err.message.includes('auth/invalid') 
                ? 'Invalid email or password' 
                : 'Something went wrong. Please try again.');
        } 
        finally {
            setEmailLoading(false);
        }
    }
    
    const handleGoogleLogin = async () => {
        setError('');
        setGoogleLoading(true);

        const provider = new GoogleAuthProvider()
        try {
            const userCredential = await signInWithPopup(auth, provider)
            const idToken = await userCredential.user.getIdToken()
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({idToken})
            })
            if (res.ok) {
                router.push('/');
            } 
            else {
                setError('Google login failed. Please try again.');
            }
        } 
        catch (err: any) {
            setError('Google sign-in was cancelled or failed.');
        } 
        finally {
            setGoogleLoading(false);
        }
    }

    const handleSignOut = async () => {
        await signOut(auth);
        await fetch('/api/auth/logout', {method: 'POST'})
    }

    return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* App Title */}
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold tracking-tighter text-white">
            MINDER
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">
            Your personal movie watchlist
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 rounded-3xl shadow-2xl p-10 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Sign in to continue
          </h2>

          {error && (
            <div className="bg-red-950 border border-red-900 text-red-400 px-4 py-3 rounded-2xl mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Email & Password */}
          <div className="space-y-6">
            <div>
              <label className="text-zinc-400 text-sm block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-sm block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* Email Login Button */}
            <button
              onClick={handleEmailLogin}
              disabled={emailLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-4 rounded-2xl transition-all duration-200 flex items-center justify-center"
            >
              {emailLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in with Email'
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-zinc-800"></div>
            <span className="text-zinc-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-zinc-800"></div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full border border-zinc-700 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3"
          >
            {googleLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Connecting...
              </span>
            ) : (
              <>
                <img 
                  src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_44dp.png" 
                  alt="Google" 
                  className="w-5 h-5" 
                />
                Continue with Google
              </>
            )}
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-zinc-500 text-xs mt-8">
          Protected by Firebase • Secure session cookies
        </p>
      </div>
    </div>
  )

}