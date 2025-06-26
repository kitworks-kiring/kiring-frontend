'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PlaneMessage } from '@/app/types/plane'
import { formatRelativeTime } from '@/utils/date'
import clsx from 'clsx'
import IcoClose from '@/assets/ico-close.svg'

export default function PlaneBottomSheet({
  planeMessages,
  open,
  onClose,
}: {
  planeMessages: PlaneMessage[]
  open: boolean
  onClose: () => void
}) {
  const [closing, setClosing] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (open) {
      setHasInteracted(true)
      setClosing(false)
    } else if (hasInteracted) {
      setClosing(true)
      const timer = setTimeout(() => {
        setClosing(false)
        setHasInteracted(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open, hasInteracted])

  if (!open && !closing) return null

  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-100 mx-auto max-w-110 transition-opacity duration-300',
          hasInteracted && (closing ? 'opacity-0' : 'opacity-100'),
          'bg-black/70',
        )}
        onClick={handleClose}
      />
      <div
        className={clsx(
          'fixed bottom-0 z-101 max-h-[80vh] w-full max-w-110 overflow-y-auto rounded-t-2xl bg-white [&::-webkit-scrollbar]:hidden',
          hasInteracted && (closing ? 'animate-slide-down' : 'animate-slide-up'),
        )}
      >
        <div className="sticky top-0 z-102 bg-white">
          <div className="head5 flex items-center justify-between border-b px-4 py-6">
            <span>종이비행기 {planeMessages.length}개</span>
            <button type="button" onClick={handleClose}>
              <IcoClose width={20} />
            </button>
          </div>
        </div>
        <div className="px-4 pt-2 pb-4">
          <ul className="mt-4 flex flex-col gap-6">
            {planeMessages.map((plane, index) => (
              <li
                key={plane.messageId}
                className={clsx(
                  'flex items-start gap-3 pb-4',
                  index !== planeMessages.length - 1 && 'border-b',
                )}
              >
                <Image
                  src={plane.sender.profileImageUrl}
                  alt={plane.sender.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="body2-sb">{plane.sender.name}</div>
                  <div className="body4 mt-2 text-gray-800">{formatRelativeTime(plane.sentAt)}</div>
                  <div className="body3 mt-4 text-gray-900">{plane.message}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
