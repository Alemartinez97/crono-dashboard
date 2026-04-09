import { Info, Users, Building2, ListChecks, Video, Banknote, TrendingUp } from 'lucide-react'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import type { Kpi, KpiKey } from '@/types/dashboard'

interface KpiCardProps {
  kpi: Kpi
  showInfo?: boolean
}

const KPI_ICONS: Record<KpiKey, React.ComponentType<{ className?: string }>> = {
  contactsEngaged: Users,
  companiesEngaged: Building2,
  activities: ListChecks,
  meetings: Video,
  deals: Banknote,
  pipeline: TrendingUp,
}

function formatNumber(value: number, prefix?: string, suffix?: string): string {
  const display = suffix === 'K' ? Math.round(value / 1000).toString() : value.toLocaleString()
  return `${prefix ?? ''}${display}${suffix ?? ''}`
}

export function KpiCard({ kpi, showInfo }: KpiCardProps) {
  const Icon = KPI_ICONS[kpi.key]
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-ink-100 p-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-ink-500">{kpi.label}</span>
        {showInfo ? <Info className="h-3.5 w-3.5 text-ink-300" /> : null}
      </div>
      <div className="flex items-center gap-1.5">
        <Icon className="h-4 w-4 text-ink-300" />
        <span className="text-lg font-semibold text-ink-900">
          {formatNumber(kpi.current, kpi.unitPrefix, kpi.unitSuffix)}
        </span>
        <span className="text-xs text-ink-300">
          /{formatNumber(kpi.target, kpi.unitPrefix, kpi.unitSuffix)}
        </span>
      </div>
      <ProgressBar value={kpi.current} max={kpi.target} tone={kpi.tone} />
    </div>
  )
}
