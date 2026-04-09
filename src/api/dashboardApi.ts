import { mockResponse } from '@/api/client'
import { mockOnboarding } from '@/api/mocks/onboarding'
import { mockPerformance } from '@/api/mocks/performance'
import { mockReplies } from '@/api/mocks/replies'
import { mockSignals } from '@/api/mocks/signals'
import { mockTasksSummary } from '@/api/mocks/tasks'
import { mockUser } from '@/api/mocks/user'
import type {
  CurrentUser,
  DashboardData,
  OnboardingStep,
  PerformanceSnapshot,
  RepliesSummary,
  Signal,
  TasksSummary,
} from '@/types/dashboard'

export const dashboardApi = {
  getCurrentUser(): Promise<CurrentUser> {
    return mockResponse(mockUser)
  },

  getTasksSummary(): Promise<TasksSummary> {
    return mockResponse(mockTasksSummary)
  },

  getRepliesSummary(): Promise<RepliesSummary> {
    return mockResponse(mockReplies)
  },

  getPerformance(): Promise<PerformanceSnapshot> {
    return mockResponse(mockPerformance)
  },

  getSignals(): Promise<Signal[]> {
    return mockResponse(mockSignals)
  },

  getOnboarding(): Promise<OnboardingStep[]> {
    return mockResponse(mockOnboarding)
  },

  async getDashboard(): Promise<DashboardData> {
    const [user, tasks, replies, performance, signals, onboarding] =
      await Promise.all([
        dashboardApi.getCurrentUser(),
        dashboardApi.getTasksSummary(),
        dashboardApi.getRepliesSummary(),
        dashboardApi.getPerformance(),
        dashboardApi.getSignals(),
        dashboardApi.getOnboarding(),
      ])
    return { user, tasks, replies, performance, signals, onboarding }
  },

  async completeSignal(id: string): Promise<{ id: string }> {
    return mockResponse({ id }, { delayMs: 250 })
  },

  async deleteSignal(id: string): Promise<{ id: string }> {
    return mockResponse({ id }, { delayMs: 250 })
  },

  async toggleOnboardingStep(id: string): Promise<{ id: string }> {
    return mockResponse({ id }, { delayMs: 200 })
  },
}
