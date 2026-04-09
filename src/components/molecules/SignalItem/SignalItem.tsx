import { Avatar } from '@/components/atoms/Avatar'
import { Button } from '@/components/atoms/Button'
import { ActionMenu } from '@/components/molecules/ActionMenu'
import { useSignalMenu } from '@/hooks/useSignalMenu'
import type { Signal } from '@/types/dashboard'

interface SignalItemProps {
  signal: Signal
  onComplete: (id: string) => void
  onDelete: (id: string) => void
}

const TAG_TONE: Record<string, string> = {
  'Role change': 'text-violet-600',
  'Company change': 'text-violet-600',
  'Website view': 'text-violet-600',
}

const FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export function SignalItem({ signal, onComplete, onDelete }: SignalItemProps) {
  const menu = useSignalMenu(signal.id)
  const tagColor = TAG_TONE[signal.tag] ?? 'text-ink-500'

  return (
    <div
      data-testid="signal-item"
      data-signal-id={signal.id}
      className="flex items-center gap-3 border-b border-ink-100 py-3 last:border-b-0"
    >
      <div className="relative">
        <span className="absolute -top-0.5 left-0 h-1.5 w-1.5 rounded-full bg-amber-400" />
        <Avatar src={signal.avatarUrl} alt="" size="md" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-ink-900">{signal.headline}</p>
        <div className="mt-0.5 flex items-center gap-2 text-[11px]">
          <span className={tagColor}>{signal.tag}</span>
          {signal.secondaryTag ? (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600">
              {signal.secondaryTag}
            </span>
          ) : null}
        </div>
      </div>

      <span className="hidden shrink-0 text-xs text-ink-300 md:inline">
        {FORMATTER.format(new Date(signal.occurredAt))}
      </span>

      <div className="relative">
        <Button
          data-testid="signal-action-button"
          variant="pill"
          size="sm"
          onClick={menu.toggle}
        >
          Action
        </Button>
        <ActionMenu
          open={menu.isOpen}
          onClose={menu.close}
          onComplete={() => onComplete(signal.id)}
          onDelete={() => onDelete(signal.id)}
        />
      </div>
    </div>
  )
}
