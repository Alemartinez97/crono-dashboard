export type IsoDate = string

export interface CurrentUser {
  id: string
  firstName: string
  lastName: string
  role: string
  avatarUrl?: string
  trialDaysLeft: number
}

export type KpiKey =
  | 'contactsEngaged'
  | 'companiesEngaged'
  | 'activities'
  | 'meetings'
  | 'deals'
  | 'pipeline'

export interface Kpi {
  key: KpiKey
  label: string
  current: number
  target: number
  unitPrefix?: string
  unitSuffix?: string
  tone: 'brand' | 'violet' | 'amber' | 'rose' | 'emerald'
}

export interface PerformanceSnapshot {
  periodLabel: string
  kpis: Kpi[]
}

export type TaskBucket = 'overdue' | 'pendingManual' | 'pendingAuto' | 'completed'

export interface TasksSummary {
  overdue: number
  pendingManual: number
  pendingAuto: number
  pendingAutoErrors: number
  completed: number
}

export interface RepliesSummary {
  count: number
  recentSenderAvatars: string[]
}

export type SignalType =
  | 'role_change'
  | 'company_change'
  | 'website_view'
  | 'job_change'

export type SignalStatus = 'new' | 'completed' | 'deleted'

export interface Signal {
  id: string
  type: SignalType
  headline: string
  tag: string
  secondaryTag?: string
  occurredAt: IsoDate
  avatarUrl?: string
  status: SignalStatus
}

export type OnboardingStepId =
  | 'integrations'
  | 'add_contact'
  | 'create_sequence'
  | 'add_to_sequence'
  | 'run_first_task'

export interface OnboardingStep {
  id: OnboardingStepId
  title: string
  durationMinutes: number
  iconKey: 'plug' | 'user-plus' | 'sparkles' | 'users' | 'check-square'
  done: boolean
}

export interface DashboardData {
  user: CurrentUser
  tasks: TasksSummary
  replies: RepliesSummary
  performance: PerformanceSnapshot
  signals: Signal[]
  onboarding: OnboardingStep[]
}
