import { Pencil } from 'lucide-react'
import { Card } from '@/components/atoms/Card'
import { KpiCard } from '@/components/molecules/KpiCard'
import type { PerformanceSnapshot } from '@/types/dashboard'

interface PerformanceKPIsProps {
  data: PerformanceSnapshot
  onEdit?: () => void
}

export function PerformanceKPIs({ data, onEdit }: PerformanceKPIsProps) {
  return (
    <Card className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-ink-900">{data.periodLabel}</h2>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
        >
          Edit KPIs
          <Pencil className="h-3 w-3" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {data.kpis.map((kpi) => (
          <KpiCard
            key={kpi.key}
            kpi={kpi}
            showInfo={kpi.key === 'contactsEngaged'}
          />
        ))}
      </div>
    </Card>
  )
}
