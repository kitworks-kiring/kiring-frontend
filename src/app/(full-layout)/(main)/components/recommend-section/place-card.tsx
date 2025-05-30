import LikeButton from '@/assets/like-button.svg'
import Like from '@/assets/like.svg'

import Image from 'next/image'

interface PlaceCardProps {
  index: number
}

export default function PlaceCard({ index }: PlaceCardProps) {
  return (
    <div key={index} className="flex flex-shrink-0 flex-col gap-2">
      <Image
        src="https://www.ricoh-imaging.co.jp/english/products/wg-6/ex/img/ex-pic04.jpg"
        alt="recommend"
        width={150}
        height={150}
        className="h-[150px] w-[150px] rounded-[12px] object-cover"
      />
      <div>
        <div className="flex items-center justify-between">
          <span className="body2 text-basic-black">해주반</span>
          <LikeButton />
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-[2px]">
            <Like />
            <span className="body5 text-purple-500">12</span>
          </div>
          <span className="body6 mt-[1px] text-gray-600">
            {'한식'} · {'당산'}
          </span>
        </div>
      </div>
    </div>
  )
}
