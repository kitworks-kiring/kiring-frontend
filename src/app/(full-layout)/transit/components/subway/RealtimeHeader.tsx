import React from 'react'
import clsx from 'clsx'

interface RealtimeHeaderProps {
  isLive: boolean
  onToggle: (isLive: boolean) => void
}

export default function RealtimeHeader({ isLive, onToggle }: RealtimeHeaderProps) {
  return (
    <div className="mt-2 flex w-fit items-center justify-between rounded-full">
      <button
        onClick={() => onToggle?.(true)}
        aria-pressed={isLive}
        aria-label="실시간 정보 보기"
        className={clsx(
          `body4 scale-[1.03] rounded-full px-3 py-2`,
          isLive && 'border border-purple-500 text-purple-500',
        )}
      >
        실시간
      </button>
      {/* <button
        onClick={() => onToggle?.(false)}
        aria-pressed={!isLive}
        aria-label="시간표 보기"
        className={clsx(
          `body4 scale-[1.03] rounded-full px-3 py-2`,
          !isLive && 'border border-purple-500 text-purple-500',
        )}
      >
        시간표
      </button> */}
      <div className="flex-1" />
    </div>
  )
}
