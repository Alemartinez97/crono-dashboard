import { ChevronRight, Mail } from 'lucide-react'
import { Avatar } from '@/components/atoms/Avatar'
import { Card } from '@/components/atoms/Card'
import { IconBox } from '@/components/atoms/IconBox'
import type { RepliesSummary } from '@/types/dashboard'

interface RepliesCardProps {
  data: RepliesSummary
  onOpenInbox?: () => void
}

export function RepliesCard({ data, onOpenInbox }: RepliesCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink-700">Replies</span>
        <button
          type="button"
          onClick={onOpenInbox}
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
        >
          Open inbox
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex flex-1 items-center justify-between gap-4 rounded-xl bg-brand-50/40 px-4 py-3">
        <div className="flex items-center gap-3">
          <IconBox tone="brand" size="lg">
            <Mail />
          </IconBox>
          <span className="text-3xl font-semibold text-ink-900">{data.count}</span>
        </div>
        <div className="flex -space-x-2">
          {data.recentSenderAvatars.map((src, idx) => (
            <Avatar key={src + idx} src={src} alt="" size="md" />
          ))}
        </div>
      </div>
    </Card>
  )
}
