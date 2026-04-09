import { Card } from '@/components/atoms/Card'
import { SignalItem } from '@/components/molecules/SignalItem'
import { useSignals } from '@/hooks/useSignals'

export function SignalsList() {
  const { signals, unreadCount, isLoading, completeSignal, deleteSignal } =
    useSignals()

  return (
    <Card data-testid="signals-list" className="flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-ink-900">Signals</h2>
        <span
          data-testid="signals-counter"
          className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-100 px-1.5 text-[11px] font-semibold text-amber-700"
        >
          {unreadCount}
        </span>
      </div>
      <p className="text-xs text-ink-500">
        Never miss a single opportunity: check out your top signals from your
        1st-degree LinkedIn connections.
      </p>

      <div className="flex flex-col">
        {isLoading && (
          <div className="py-6 text-center text-xs text-ink-300">Loading signals…</div>
        )}
        {!isLoading && signals.length === 0 && (
          <div className="py-6 text-center text-xs text-ink-300">
            No signals right now. Check back later.
          </div>
        )}
        {signals.map((signal) => (
          <SignalItem
            key={signal.id}
            signal={signal}
            onComplete={completeSignal}
            onDelete={deleteSignal}
          />
        ))}
      </div>
    </Card>
  )
}
