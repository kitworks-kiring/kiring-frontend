'use client'

import IcoClose from '@/assets/ico-close.svg'

interface PopupProps {
  Ico: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  onClose: () => void
}

export default function Popup({ Ico, title, description, onClose }: PopupProps) {
  return (
    <div className="full-width flex h-16 items-center justify-between rounded-[20px] bg-white p-3">
      <div className="flex items-center gap-3">
        {Ico}
        <div className="flex flex-col gap-1">
          {title}
          {description}
        </div>
      </div>
      <button onClick={onClose}>
        <IcoClose />
      </button>
    </div>
  )
}
