"use client";

import { useEffect, useRef } from 'react'
import { Provider, useDispatch, useSelector, useStore } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { fetchFeedback, fetchMovies, inputHandlingReducer } from './store/reducer/InputHandlingReducer'
import { auth } from './lib/firebase'
import { onAuthStateChanged } from 'firebase/auth';


export const makeStore = () => {const store = configureStore({
   reducer: inputHandlingReducer,
})
  return store
};



export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined)
  const dispatchRef = useRef<AppDispatch | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
    dispatchRef.current = storeRef.current.dispatch
  }

  useEffect(() => {
    if (!dispatchRef.current) {
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User is logged in!")

        try {
          await dispatchRef.current!(fetchFeedback())
          console.log("Fetch feedback is complete.")
          await dispatchRef.current!(fetchMovies())
          console.log("Fetch movies is complete")
        } catch (error) {
          console.error("Error:", error)
        }
      }
      else {
        console.log("User not logged in yet!")
      }
      return () => unsubscribe()
    })

  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
