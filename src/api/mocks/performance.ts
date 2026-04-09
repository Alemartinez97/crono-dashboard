import type { PerformanceSnapshot } from '@/types/dashboard'

export const mockPerformance: PerformanceSnapshot = {
  periodLabel: "May's performance",
  kpis: [
    {
      key: 'contactsEngaged',
      label: 'Contacts engaged',
      current: 0,
      target: 500,
      tone: 'violet',
    },
    {
      key: 'companiesEngaged',
      label: 'Companies engaged',
      current: 0,
      target: 500,
      tone: 'brand',
    },
    {
      key: 'activities',
      label: 'Activities',
      current: 1000,
      target: 2000,
      tone: 'violet',
    },
    {
      key: 'meetings',
      label: 'Meetings',
      current: 20,
      target: 30,
      tone: 'amber',
    },
    {
      key: 'deals',
      label: 'Deals',
      current: 100,
      target: 200,
      tone: 'rose',
    },
    {
      key: 'pipeline',
      label: 'Pipeline',
      current: 50_000,
      target: 100_000,
      unitPrefix: '€',
      unitSuffix: 'K',
      tone: 'emerald',
    },
  ],
}
