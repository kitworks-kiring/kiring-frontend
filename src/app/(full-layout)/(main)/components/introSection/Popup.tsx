'use client'

import IcoMainArrowRight from '@/assets/ico-main-arrow-right.svg'
import clsx from 'clsx'

interface PopupProps {
  Ico: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  onClick?: () => void
  page?: 'profile' | 'main'
}

export default function Popup({ Ico, title, description, page, onClick }: PopupProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'full-width flex h-16 items-center justify-between rounded-[20px] p-3 transition-all duration-300 ease-in-out hover:cursor-pointer',
        page === 'profile' ? 'bg-gray-50' : 'bg-white',
      )}
    >
      <div className="flex items-center gap-3">
        {Ico}
        <div className="flex flex-col gap-1">
          {title}
          {description}
        </div>
      </div>
      <IcoMainArrowRight />
    </div>
  )
}
