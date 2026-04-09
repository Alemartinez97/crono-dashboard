import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
  sidebarCollapsed: boolean
  openSignalMenuId: string | null
}

const initialState: UiState = {
  sidebarCollapsed: false,
  openSignalMenuId: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload
    },
    openSignalMenu(state, action: PayloadAction<string>) {
      state.openSignalMenuId = action.payload
    },
    closeSignalMenu(state) {
      state.openSignalMenuId = null
    },
  },
})

export const {
  toggleSidebar,
  setSidebarCollapsed,
  openSignalMenu,
  closeSignalMenu,
} = uiSlice.actions

export default uiSlice.reducer
