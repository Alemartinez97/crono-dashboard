import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SignalsState {
  completedIds: string[]
  deletedIds: string[]
}

const initialState: SignalsState = {
  completedIds: [],
  deletedIds: [],
}

const signalsSlice = createSlice({
  name: 'signals',
  initialState,
  reducers: {
    markSignalCompleted(state, action: PayloadAction<string>) {
      if (!state.completedIds.includes(action.payload)) {
        state.completedIds.push(action.payload)
      }
    },
    markSignalDeleted(state, action: PayloadAction<string>) {
      if (!state.deletedIds.includes(action.payload)) {
        state.deletedIds.push(action.payload)
      }
    },
    resetSignalOverrides() {
      return initialState
    },
  },
})

export const { markSignalCompleted, markSignalDeleted, resetSignalOverrides } =
  signalsSlice.actions

export default signalsSlice.reducer
