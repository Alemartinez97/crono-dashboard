import { OnboardingList } from '@/components/organisms/OnboardingList'
import { PerformanceKPIs } from '@/components/organisms/PerformanceKPIs'
import { SignalsList } from '@/components/organisms/SignalsList'
import { TodaysTasks } from '@/components/organisms/TodaysTasks'
import { WelcomeCard } from '@/components/molecules/WelcomeCard'
import { RepliesCard } from '@/components/molecules/RepliesCard'
import { DashboardLayout } from '@/components/templates/DashboardLayout'
import { useDashboardData } from '@/hooks/useDashboardData'

export function Dashboard() {
  const { data, isLoading, isError } = useDashboardData()

  if (isLoading || !data) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-ink-500">
        Loading dashboard…
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-rose-500">
        Failed to load dashboard.
      </div>
    )
  }

  return (
    <DashboardLayout user={data.user} inboxBadge={data.replies.count}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <WelcomeCard user={data.user} />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <RepliesCard data={data.replies} />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:row-span-2">
          <PerformanceKPIs data={data.performance} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <TodaysTasks data={data.tasks} />
        </div>

        <div className="col-span-12 lg:col-span-8">
          <SignalsList />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <OnboardingList />
        </div>
      </div>
    </DashboardLayout>
  )
}
