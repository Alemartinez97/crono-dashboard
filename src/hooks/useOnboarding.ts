import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { dashboardApi } from '@/api/dashboardApi'
import { queryKeys } from '@/hooks/queryKeys'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleOnboardingStep } from '@/store/slices/onboardingSlice'
import type { OnboardingStep } from '@/types/dashboard'

export function useOnboarding() {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const completedStepIds = useAppSelector(
    (s) => s.onboarding.completedStepIds,
  )

  const query = useQuery({
    queryKey: queryKeys.onboarding,
    queryFn: dashboardApi.getOnboarding,
  })

  const steps = useMemo<OnboardingStep[]>(() => {
    if (!query.data) return []
    return query.data.map((step) => ({
      ...step,
      done: completedStepIds.includes(step.id),
    }))
  }, [query.data, completedStepIds])

  const toggleStep = useMutation({
    mutationFn: (id: string) => dashboardApi.toggleOnboardingStep(id),
    onSuccess: ({ id }) => {
      dispatch(toggleOnboardingStep(id))
      queryClient.invalidateQueries({ queryKey: queryKeys.onboarding })
    },
  })

  return {
    steps,
    isLoading: query.isLoading,
    toggleStep: toggleStep.mutate,
  }
}
