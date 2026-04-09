import { Check, Trash2 } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'

interface ActionMenuProps {
  open: boolean
  onClose: () => void
  onComplete: () => void
  onDelete: () => void
  className?: string
}

export function ActionMenu({
  open,
  onClose,
  onComplete,
  onDelete,
  className,
}: ActionMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target) return
      if (ref.current && ref.current.contains(target)) return
      if (target.closest('[data-testid="signal-action-button"]')) return
      onClose()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      ref={ref}
      data-testid="signal-action-menu"
      className={cn(
        'absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-ink-100 bg-white shadow-hover',
        className,
      )}
      role="menu"
    >
      <button
        type="button"
        data-testid="signal-action-complete"
        onClick={() => {
          onComplete()
          onClose()
        }}
        className="flex w-full items-center justify-between bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
      >
        Complete
        <Check className="h-4 w-4" />
      </button>
      <button
        type="button"
        data-testid="signal-action-delete"
        onClick={() => {
          onDelete()
          onClose()
        }}
        className="flex w-full items-center justify-between px-3 py-2 text-sm text-ink-700 hover:bg-ink-50"
      >
        Delete
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}
