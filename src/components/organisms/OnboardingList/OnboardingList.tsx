import { Card } from '@/components/atoms/Card'
import { OnboardingItem } from '@/components/molecules/OnboardingItem'
import { useOnboarding } from '@/hooks/useOnboarding'

export function OnboardingList() {
  const { steps, isLoading, toggleStep } = useOnboarding()

  return (
    <Card className="flex flex-col gap-2 p-5">
      <h2 className="text-base font-semibold text-ink-900">Onboarding</h2>
      <div className="flex flex-col">
        {isLoading && (
          <div className="py-4 text-center text-xs text-ink-300">Loading…</div>
        )}
        {steps.map((step) => (
          <OnboardingItem key={step.id} step={step} onToggle={toggleStep} />
        ))}
      </div>
    </Card>
  )
}
