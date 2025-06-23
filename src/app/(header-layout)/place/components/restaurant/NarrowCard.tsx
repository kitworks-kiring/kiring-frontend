import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import {
  LIKE_IMG_URL,
  NOT_LIKE_BTN_IMG_URL,
  LIKED_BTN_IMG_URL,
} from '@/app/(header-layout)/place/constants'
import { LatLngType } from '@/utils/calcDistance'
import { RealRestaurantType } from '@/app/(header-layout)/place/types/restaurantType'

export default function NarrowCard({
  restaurant,
  idx,
  onFocusChange,
  onCenterChange,
  showMapTrue,
}: {
  restaurant: RealRestaurantType
  idx?: number
  onFocusChange?: (restaurant: RealRestaurantType | null) => void
  onCenterChange?: (center: LatLngType) => void
  showMapTrue?: () => void
}) {
  const flexItemsCenter = 'body5 flex items-center'

  const setFocusChange = (restaurant: RealRestaurantType | null) => {
    if (!restaurant || !onFocusChange || !onCenterChange || !showMapTrue) return
    onFocusChange(restaurant)
    // TODO: API 수정되면 lat, lng 순서 변경
    onCenterChange({ lat: restaurant.longitude, lng: restaurant.latitude })
    showMapTrue()
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_2fr_0.5fr] border-b border-gray-50 px-3 py-4">
        <button type="button">
          <Image
            src={restaurant.imageUrl}
            alt={`${restaurant.name} 이미지`}
            width={100}
            height={100}
            priority={idx ? idx <= 5 : true}
            className="h-25 min-h-20 w-25 min-w-20 rounded-sm object-cover"
            onClick={() => onFocusChange && setFocusChange(restaurant)}
          />
        </button>
        <ul className="flex flex-col gap-2.5 pl-2">
          <li>
            <button
              type="button"
              className="body2-sb text-left"
              onClick={() => onFocusChange && setFocusChange(restaurant)}
            >
              {restaurant.name}
            </button>
            {restaurant.likeCount >= 15 && (
              <span className="body6 rounded-lg bg-purple-50 px-2 py-1 text-purple-300">인기</span>
            )}
          </li>
          <li className={clsx(flexItemsCenter, 'body5 gap-1')}>
            <div className={clsx(flexItemsCenter, 'gap-0.5')}>
              <Image
                src={LIKE_IMG_URL}
                alt="좋아요 수 아이콘"
                width={12}
                height={12}
                priority={idx ? idx <= 5 : true}
              />
              <span className="text-purple-500">{restaurant.likeCount}</span>
            </div>
            <span className="ml-1 text-gray-600">{restaurant.categories.join(' · ')}</span>
          </li>
          <li className={clsx(flexItemsCenter, 'body5 items-start gap-1')}>
            <span className="text-purple-300">
              {Math.floor(restaurant.distanceInMeters).toLocaleString()}m
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-[9px] text-gray-600">{restaurant.address.slice(8)}</span>
          </li>
          <li>
            <ul className={clsx(flexItemsCenter, 'body6 gap-1')}>
              {restaurant.kiringCategory.map((menu) => (
                <li key={menu} className="rounded-lg bg-gray-50 px-2 py-1 text-gray-600">
                  {menu}
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <div className="flex items-start justify-end">
          <button type="button">
            <span className="sr-only">좋아요 버튼</span>
            <Image
              src={restaurant.isLiked ? LIKED_BTN_IMG_URL : NOT_LIKE_BTN_IMG_URL}
              alt="좋아요 버튼 아이콘"
              width={20}
              height={20}
              priority={idx ? idx <= 5 : true}
            />
          </button>
        </div>
      </div>
    </>
  )
}
