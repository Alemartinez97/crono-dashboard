import type { ReactNode } from 'react'
import { Sidebar } from '@/components/organisms/Sidebar'
import type { CurrentUser } from '@/types/dashboard'

interface DashboardLayoutProps {
  user: CurrentUser
  inboxBadge?: number
  children: ReactNode
}

export function DashboardLayout({
  user,
  inboxBadge,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-canvas">
      <Sidebar user={user} inboxBadge={inboxBadge} />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  )
}
