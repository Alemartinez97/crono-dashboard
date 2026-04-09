import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { dashboardApi } from '@/api/dashboardApi'
import { queryKeys } from '@/hooks/queryKeys'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  markSignalCompleted,
  markSignalDeleted,
} from '@/store/slices/signalsSlice'
import type { Signal } from '@/types/dashboard'

export function useSignals() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const completedIds = useAppSelector((s) => s.signals.completedIds)
  const deletedIds = useAppSelector((s) => s.signals.deletedIds)

  const query = useQuery({
    queryKey: queryKeys.signals,
    queryFn: dashboardApi.getSignals,
  })

  const unreadSignals = useMemo<Signal[]>(() => {
    if (!query.data) return []
    return query.data.filter(
      (s) => !deletedIds.includes(s.id) && !completedIds.includes(s.id),
    )
  }, [query.data, completedIds, deletedIds])

  const completeMutation = useMutation({
    mutationFn: (id: string) => dashboardApi.completeSignal(id),
    onSuccess: ({ id }) => {
      dispatch(markSignalCompleted(id))
      queryClient.invalidateQueries({ queryKey: queryKeys.signals })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => dashboardApi.deleteSignal(id),
    onSuccess: ({ id }) => {
      dispatch(markSignalDeleted(id))
      queryClient.invalidateQueries({ queryKey: queryKeys.signals })
    },
  })

  return {
    signals: unreadSignals,
    unreadCount: unreadSignals.length,
    isLoading: query.isLoading,
    isError: query.isError,
    completeSignal: completeMutation.mutate,
    deleteSignal: deleteMutation.mutate,
  }
}
