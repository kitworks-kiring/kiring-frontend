'use client'

import Image from 'next/image'

interface PlaneMessageCardProps {
  plane: PlaneMessage
}

export default function PlaneMessageCard({ plane }: PlaneMessageCardProps) {
  return (
    <div className="min-w-80 flex-shrink-0 snap-start rounded-lg border bg-white p-4 shadow-md">
      <p className="body4 mb-3 text-gray-800">{plane?.message}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={plane.senderProfileImageUrl}
            alt={`${plane.senderName} 프로필 이미지`}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <p className="body4-sb text-black">{plane.senderName}</p>
            <p className="body5 text-gray-400">{plane.sentAt}</p>
          </div>
        </div>
        <button type="button" className="p-2">
          <div className="h-5 w-5 text-purple-400" />
        </button>
      </div>
    </div>
  )
}
