import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Tone = 'brand' | 'violet' | 'amber' | 'rose' | 'emerald' | 'neutral'

interface IconBoxProps {
  children: ReactNode
  tone?: Tone
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const TONE_CLASSES: Record<Tone, string> = {
  brand: 'bg-brand-50 text-brand-600',
  violet: 'bg-violet-50 text-violet-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  neutral: 'bg-ink-100 text-ink-500',
}

const SIZE_CLASSES = {
  sm: 'h-7 w-7 [&>svg]:h-3.5 [&>svg]:w-3.5',
  md: 'h-9 w-9 [&>svg]:h-4 [&>svg]:w-4',
  lg: 'h-11 w-11 [&>svg]:h-5 [&>svg]:w-5',
}

export function IconBox({
  children,
  tone = 'brand',
  size = 'md',
  className,
}: IconBoxProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-lg',
        TONE_CLASSES[tone],
        SIZE_CLASSES[size],
        className,
      )}
    >
      {children}
    </div>
  )
}
