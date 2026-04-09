import onboardingReducer, {
  toggleOnboardingStep,
  type OnboardingState,
} from '@/store/slices/onboardingSlice'

describe('onboardingSlice', () => {
  const initial: OnboardingState = { completedStepIds: [] }

  it('starts with an empty list', () => {
    const state = onboardingReducer(undefined, { type: '@@INIT' })
    expect(state).toEqual(initial)
  })

  it('toggleOnboardingStep adds the id when it is not present', () => {
    const state = onboardingReducer(initial, toggleOnboardingStep('integrations'))
    expect(state.completedStepIds).toEqual(['integrations'])
  })

  it('toggleOnboardingStep removes the id when it is already present', () => {
    const seeded: OnboardingState = {
      completedStepIds: ['integrations', 'add_contact'],
    }
    const state = onboardingReducer(seeded, toggleOnboardingStep('integrations'))
    expect(state.completedStepIds).toEqual(['add_contact'])
  })
})
