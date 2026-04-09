import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { closeSignalMenu, openSignalMenu } from '@/store/slices/uiSlice'

export function useSignalMenu(signalId: string) {
  const dispatch = useAppDispatch()
  const openId = useAppSelector((s) => s.ui.openSignalMenuId)
  const isOpen = openId === signalId

  const open = useCallback(
    () => dispatch(openSignalMenu(signalId)),
    [dispatch, signalId],
  )
  const close = useCallback(() => dispatch(closeSignalMenu()), [dispatch])
  const toggle = useCallback(
    () => (isOpen ? dispatch(closeSignalMenu()) : dispatch(openSignalMenu(signalId))),
    [dispatch, isOpen, signalId],
  )

  return { isOpen, open, close, toggle }
}
