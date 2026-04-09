import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface NavItemProps {
  icon: LucideIcon
  label: string
  active?: boolean
  badge?: number
  collapsed?: boolean
  onClick?: () => void
}

export function NavItem({
  icon: Icon,
  label,
  active,
  badge,
  collapsed,
  onClick,
}: NavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-brand-50 text-brand-600'
          : 'text-ink-500 hover:bg-ink-50 hover:text-ink-700',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="flex-1 text-left">{label}</span>}
      {!collapsed && badge ? (
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
          {badge}
        </span>
      ) : null}
    </button>
  )
}
