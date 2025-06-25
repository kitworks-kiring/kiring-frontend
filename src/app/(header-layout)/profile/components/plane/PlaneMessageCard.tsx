'use client'

import Image from 'next/image'
import IcoPlane from '@/assets/ico-plane.svg'
import { PlaneMessage } from '@/app/types/plane'
import { formatRelativeTime } from '@/utils/date'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

export default function PlaneMessageCard({
  plane,
  isSingle,
}: {
  plane: PlaneMessage
  isSingle?: boolean
}) {
  const router = useRouter()
  return (
    <li
      className={clsx(
        'flex h-56 flex-col justify-between rounded-xl border bg-white p-5',
        isSingle ? 'w-89' : 'w-80',
      )}
    >
      <p className="body2 line-clamp-4 text-gray-800">{plane?.message}</p>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-3">
          <Image
            //TODO : default 이미지 수정
            src={plane.sender.profileImageUrl || '/default/avatar.png'}
            alt={`${plane.sender.name} 프로필 이미지`}
            width={52}
            height={52}
            className="min-h-13 rounded-full border border-gray-300"
          />
          <div className="flex flex-col gap-2 pt-2">
            <p className="body2-sb text-black">{plane.sender.name}</p>
            <p className="body4 text-gray-400">
              {plane.sentAt && formatRelativeTime(plane.sentAt)}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="비행기 답장 보내기"
          className="flex-row-center h-10 w-10 rounded-full bg-purple-500"
        >
          <IcoPlane
            onClick={() => {
              router.push('/plane')
            }}
          />
        </button>
      </div>
    </li>
  )
}
