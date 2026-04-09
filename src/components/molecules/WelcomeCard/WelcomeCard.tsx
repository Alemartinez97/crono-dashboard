import { Card } from '@/components/atoms/Card'
import type { CurrentUser } from '@/types/dashboard'

interface WelcomeCardProps {
  user: CurrentUser
}

export function WelcomeCard({ user }: WelcomeCardProps) {
  return (
    <Card className="flex h-full flex-col justify-center gap-2 p-6">
      <h1 className="text-2xl font-semibold text-ink-900">
        Welcome {user.firstName},
      </h1>
      <p className="text-sm text-ink-500">
        Here&apos;s your performance overview where you can track your daily and
        monthly KPIs
      </p>
    </Card>
  )
}
