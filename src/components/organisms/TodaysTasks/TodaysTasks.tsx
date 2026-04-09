import { Card } from '@/components/atoms/Card'
import { StatCard } from '@/components/molecules/StatCard'
import type { TasksSummary } from '@/types/dashboard'

interface TodaysTasksProps {
  data: TasksSummary
  onSelectBucket?: (bucket: keyof TasksSummary) => void
}

export function TodaysTasks({ data, onSelectBucket }: TodaysTasksProps) {
  return (
    <Card className="flex flex-col gap-3 p-5">
      <h2 className="text-base font-semibold text-ink-900">Today&apos;s tasks</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          label="Overdue"
          value={data.overdue}
          tone="rose"
          onClick={() => onSelectBucket?.('overdue')}
        />
        <StatCard
          label="Pending Manual"
          value={data.pendingManual}
          tone="amber"
          onClick={() => onSelectBucket?.('pendingManual')}
        />
        <StatCard
          label="Pending Auto"
          value={data.pendingAuto}
          tone="info"
          errorCount={data.pendingAutoErrors}
          onClick={() => onSelectBucket?.('pendingAuto')}
        />
        <StatCard
          label="Completed"
          value={data.completed}
          tone="emerald"
          onClick={() => onSelectBucket?.('completed')}
        />
      </div>
    </Card>
  )
}
