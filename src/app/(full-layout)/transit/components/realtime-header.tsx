import React from 'react'
import clsx from 'clsx'

export default function RealtimeHeader() {
  const isLive = true
  return (
    <div className="mt-3 flex w-fit items-center justify-between rounded-full border border-gray-200">
      <button
        className={clsx(
          `body4 scale-[1.03] rounded-full px-3 py-2`,
          isLive && 'border border-purple-500 text-purple-500',
        )}
      >
        실시간
      </button>
      <button
        className={clsx(
          `body4 scale-[1.03] rounded-full px-3 py-2`,
          !isLive && 'border border-purple-500 text-purple-500',
        )}
      >
        시간표
      </button>
      <div className="flex-1" />
    </div>
  )
}
