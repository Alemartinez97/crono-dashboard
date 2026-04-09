import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface OnboardingState {
  completedStepIds: string[]
}

const initialState: OnboardingState = {
  completedStepIds: [],
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    toggleOnboardingStep(state, action: PayloadAction<string>) {
      const id = action.payload
      const idx = state.completedStepIds.indexOf(id)
      if (idx >= 0) {
        state.completedStepIds.splice(idx, 1)
      } else {
        state.completedStepIds.push(id)
      }
    },
  },
})

export const { toggleOnboardingStep } = onboardingSlice.actions

export default onboardingSlice.reducer
