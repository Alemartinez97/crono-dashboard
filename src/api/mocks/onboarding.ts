import type { OnboardingStep } from '@/types/dashboard'

export const mockOnboarding: OnboardingStep[] = [
  {
    id: 'integrations',
    title: 'Integrations Setup',
    durationMinutes: 5,
    iconKey: 'plug',
    done: false,
  },
  {
    id: 'add_contact',
    title: 'Add new Contact',
    durationMinutes: 5,
    iconKey: 'user-plus',
    done: false,
  },
  {
    id: 'create_sequence',
    title: 'Create your first sequence',
    durationMinutes: 10,
    iconKey: 'sparkles',
    done: false,
  },
  {
    id: 'add_to_sequence',
    title: 'Add contacts to sequence',
    durationMinutes: 5,
    iconKey: 'users',
    done: false,
  },
  {
    id: 'run_first_task',
    title: 'Run your first task',
    durationMinutes: 10,
    iconKey: 'check-square',
    done: false,
  },
]
