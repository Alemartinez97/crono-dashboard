import uiReducer, {
  closeSignalMenu,
  openSignalMenu,
  setSidebarCollapsed,
  toggleSidebar,
  type UiState,
} from '@/store/slices/uiSlice'

describe('uiSlice', () => {
  const initial: UiState = { sidebarCollapsed: false, openSignalMenuId: null }

  it('starts with the sidebar expanded and no menu open', () => {
    const state = uiReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual(initial)
  })

  it('toggleSidebar flips the sidebarCollapsed flag', () => {
    const collapsed = uiReducer(initial, toggleSidebar())
    expect(collapsed.sidebarCollapsed).toBe(true)
    const expanded = uiReducer(collapsed, toggleSidebar())
    expect(expanded.sidebarCollapsed).toBe(false)
  })

  it('setSidebarCollapsed accepts the explicit value', () => {
    const state = uiReducer(initial, setSidebarCollapsed(true))
    expect(state.sidebarCollapsed).toBe(true)
  })

  it('openSignalMenu stores the provided id', () => {
    const state = uiReducer(initial, openSignalMenu('sig_001'))
    expect(state.openSignalMenuId).toBe('sig_001')
  })

  it('openSignalMenu replaces a previously open id', () => {
    const seeded: UiState = { sidebarCollapsed: false, openSignalMenuId: 'sig_001' }
    const state = uiReducer(seeded, openSignalMenu('sig_002'))
    expect(state.openSignalMenuId).toBe('sig_002')
  })

  it('closeSignalMenu resets the id to null', () => {
    const seeded: UiState = { sidebarCollapsed: false, openSignalMenuId: 'sig_001' }
    const state = uiReducer(seeded, closeSignalMenu())
    expect(state.openSignalMenuId).toBeNull()
  })
})
