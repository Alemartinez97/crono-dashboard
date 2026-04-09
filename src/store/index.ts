import { configureStore } from '@reduxjs/toolkit'
import onboardingReducer from '@/store/slices/onboardingSlice'
import signalsReducer from '@/store/slices/signalsSlice'
import uiReducer from '@/store/slices/uiSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    signals: signalsReducer,
    onboarding: onboardingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
