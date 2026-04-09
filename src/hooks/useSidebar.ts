import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  setSidebarCollapsed,
  toggleSidebar,
} from '@/store/slices/uiSlice'

export function useSidebar() {
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed)

  const toggle = useCallback(() => dispatch(toggleSidebar()), [dispatch])
  const setCollapsed = useCallback(
    (next: boolean) => dispatch(setSidebarCollapsed(next)),
    [dispatch],
  )

  return { collapsed, toggle, setCollapsed }
}
