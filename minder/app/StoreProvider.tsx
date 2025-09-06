import { useRef } from 'react'
import { Provider, useDispatch, useSelector, useStore } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { inputHandlingReducer } from './store/reducer/InputHandlingReducer'

export const makeStore = () => configureStore({
   reducer: inputHandlingReducer,
});

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
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
