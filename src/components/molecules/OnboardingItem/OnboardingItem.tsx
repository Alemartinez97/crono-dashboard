import {
  CheckSquare,
  Plug,
  Sparkles,
  UserPlus,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { IconBox } from '@/components/atoms/IconBox'
import { cn } from '@/utils/cn'
import type { OnboardingStep } from '@/types/dashboard'

interface OnboardingItemProps {
  step: OnboardingStep
  onToggle: (id: string) => void
}

const ICONS: Record<OnboardingStep['iconKey'], LucideIcon> = {
  plug: Plug,
  'user-plus': UserPlus,
  sparkles: Sparkles,
  users: Users,
  'check-square': CheckSquare,
}

const TONE_BY_KEY: Record<OnboardingStep['iconKey'], 'brand' | 'violet' | 'rose' | 'amber' | 'emerald'> = {
  plug: 'brand',
  'user-plus': 'violet',
  sparkles: 'rose',
  users: 'amber',
  'check-square': 'violet',
}

export function OnboardingItem({ step, onToggle }: OnboardingItemProps) {
  const Icon = ICONS[step.iconKey]
  return (
    <button
      type="button"
      onClick={() => onToggle(step.id)}
      className="flex w-full items-center gap-3 border-b border-ink-100 py-3 text-left last:border-b-0 hover:bg-ink-50/40"
    >
      <IconBox tone={TONE_BY_KEY[step.iconKey]} size="md">
        <Icon />
      </IconBox>
      <div className="flex-1">
        <p
          className={cn(
            'text-sm font-medium',
            step.done ? 'text-ink-300 line-through' : 'text-ink-900',
          )}
        >
          {step.title}
        </p>
      </div>
      <span className="text-xs text-ink-300">{step.durationMinutes} min</span>
    </button>
  )
}
