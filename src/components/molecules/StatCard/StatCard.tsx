import { ChevronRight, AlertTriangle } from 'lucide-react'
import { cn } from '@/utils/cn'

type Tone = 'rose' | 'amber' | 'info' | 'emerald'

interface StatCardProps {
  label: string
  value: number
  tone?: Tone
  errorCount?: number
  onClick?: () => void
}

const TONE_CLASSES: Record<Tone, { bg: string; ring: string; value: string }> = {
  rose: {
    bg: 'bg-rose-50/70',
    ring: 'border-rose-100',
    value: 'text-rose-500',
  },
  amber: {
    bg: 'bg-amber-50/70',
    ring: 'border-amber-100',
    value: 'text-amber-600',
  },
  info: {
    bg: 'bg-blue-50/70',
    ring: 'border-blue-100',
    value: 'text-blue-600',
  },
  emerald: {
    bg: 'bg-emerald-50/70',
    ring: 'border-emerald-100',
    value: 'text-emerald-600',
  },
}

export function StatCard({
  label,
  value,
  tone = 'info',
  errorCount,
  onClick,
}: StatCardProps) {
  const t = TONE_CLASSES[tone]
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex flex-1 flex-col justify-between gap-2 rounded-xl border p-3 text-left transition-shadow hover:shadow-card',
        t.bg,
        t.ring,
      )}
    >
      <div className="flex items-start justify-between">
        <span className={cn('text-2xl font-semibold', t.value)}>{value}</span>
        {errorCount && errorCount > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-600">
            <AlertTriangle className="h-3 w-3" />
            {errorCount} error
          </span>
        ) : null}
      </div>
      <div className="flex items-center justify-between text-xs text-ink-700">
        <span>{label}</span>
        <ChevronRight className="h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-0.5" />
      </div>
    </button>
  )
}
