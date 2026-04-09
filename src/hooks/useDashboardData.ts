import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '@/api/dashboardApi'
import { queryKeys } from '@/hooks/queryKeys'

export function useDashboardData() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: dashboardApi.getDashboard,
  })
}
