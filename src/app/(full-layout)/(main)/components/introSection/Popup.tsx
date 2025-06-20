'use client'

import IcoClose from '@/assets/ico-close.svg'
import { useState } from 'react'

interface PopupProps {
  Ico: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  onClose: () => void
}

export default function Popup({ Ico, title, description, onClose }: PopupProps) {
  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose()
    }, 300) // 애니메이션 시간과 맞춤
  }

  return (
    <div
      className={`full-width flex h-16 items-center justify-between rounded-[20px] bg-white p-3 transition-all duration-300 ease-in-out ${closing ? 'pointer-events-none -translate-y-6 opacity-0' : 'translate-y-0 opacity-100'}`}
    >
      <div className="flex items-center gap-3">
        {Ico}
        <div className="flex flex-col gap-1">
          {title}
          {description}
        </div>
      </div>
      <button onClick={handleClose}>
        <IcoClose />
      </button>
    </div>
  )
}
