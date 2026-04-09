import { cn } from '@/utils/cn'

type Tone = 'brand' | 'violet' | 'amber' | 'rose' | 'emerald'

interface ProgressBarProps {
  value: number
  max: number
  tone?: Tone
  className?: string
}

const TONE_CLASSES: Record<Tone, string> = {
  brand: 'bg-brand-500',
  violet: 'bg-violet-500',
  amber: 'bg-amber-500',
  rose: 'bg-rose-500',
  emerald: 'bg-emerald-500',
}

export function ProgressBar({
  value,
  max,
  tone = 'brand',
  className,
}: ProgressBarProps) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-ink-100', className)}>
      <div
        className={cn('h-full rounded-full transition-all', TONE_CLASSES[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
