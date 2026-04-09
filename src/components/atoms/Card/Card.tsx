import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-ink-100 bg-white shadow-card',
        className,
      )}
      {...rest}
    />
  )
}
