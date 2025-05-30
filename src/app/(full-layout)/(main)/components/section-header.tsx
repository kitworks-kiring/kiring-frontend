'use client'

import ArrowRight from '@/assets/arrow-right.svg'

interface SectionHeaderProps {
  time?: string
  title: string
  onClick: () => void
}

export default function SectionHeader({ time, title, onClick }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 pt-6 pb-5">
      <div className="gap flex gap-2">
        {time && <span className="body2-sb text-purple-200">{time}</span>}
        <span className="head5 text-basic-black">{title}</span>
      </div>
      <ArrowRight onClick={onClick} />
    </div>
  )
}
