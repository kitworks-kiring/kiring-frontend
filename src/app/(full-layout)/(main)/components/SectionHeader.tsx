'use client'

import IcoMainArrowRight from '@/assets/ico-main-arrow-right.svg'

interface SectionHeaderProps {
  time?: string
  title: string
  onClick: () => void
  isLoading?: boolean
}

export default function SectionHeader({
  time,
  title,
  onClick,
  isLoading = false,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 pt-6 pb-5">
      <div className="gap flex gap-2">
        {isLoading ? (
          // 스켈레톤 UI
          <div className="flex items-center gap-2">
            <div className="h-5 w-12 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-55 animate-pulse rounded bg-gray-200" />
          </div>
        ) : (
          // 실제 데이터
          <>
            {time && <span className="body2-sb text-purple-200">{time}</span>}
            <button type="button" onClick={onClick} className="head5 text-basic-black">
              {title}
            </button>
          </>
        )}
      </div>
      <button onClick={onClick}>
        <IcoMainArrowRight />
      </button>
    </div>
  )
}
