import {
  BarChart3,
  ChevronsLeft,
  ChevronsRight,
  Database,
  Inbox,
  LayoutDashboard,
  ListTodo,
  Mail,
  Search,
  Sparkles,
  Table2,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '@/components/atoms/Avatar'
import { Button } from '@/components/atoms/Button'
import { NavItem } from '@/components/molecules/NavItem'
import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/utils/cn'
import type { CurrentUser } from '@/types/dashboard'

interface SidebarProps {
  user: CurrentUser
  inboxBadge?: number
}

interface NavConfig {
  id: string
  label: string
  icon: LucideIcon
  badge?: number
}

const NAV_TOP: NavConfig[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'find-new', label: 'Find New', icon: Search },
  { id: 'lists', label: 'Lists', icon: Table2 },
  { id: 'templates', label: 'Templates', icon: Mail },
  { id: 'sequences', label: 'Sequences', icon: Sparkles },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'deals', label: 'Deals', icon: Database },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
]

export function Sidebar({ user, inboxBadge }: SidebarProps) {
  const { collapsed, toggle } = useSidebar()
  const [activeId, setActiveId] = useState('dashboard')

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-ink-100 bg-white transition-[width] duration-200',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      <div className="flex items-center justify-between gap-2 p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-brand-500 text-white">
              <Zap className="h-3.5 w-3.5" />
            </span>
            <span className="text-base font-semibold text-ink-900">crono</span>
          </div>
        )}
        <button
          type="button"
          onClick={toggle}
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-ink-500 hover:bg-ink-100"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <ChevronsLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {NAV_TOP.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeId === item.id}
            badge={item.id === 'inbox' ? inboxBadge : undefined}
            collapsed={collapsed}
            onClick={() => setActiveId(item.id)}
          />
        ))}
      </nav>

      {!collapsed && (
        <div className="mx-3 mb-4 rounded-xl bg-amber-50 p-3 text-xs">
          <p className="font-medium text-ink-900">
            Trial ends in {user.trialDaysLeft} days
          </p>
          <Button variant="pill" size="sm" className="mt-2 w-full bg-amber-200 text-amber-900 hover:bg-amber-300">
            Upgrade plan
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-ink-100 p-3">
        <Avatar
          fallback={user.firstName[0] + user.lastName[0]}
          size="md"
        />
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-[11px] text-ink-500">{user.role}</p>
          </div>
        )}
      </div>
    </aside>
  )
}
