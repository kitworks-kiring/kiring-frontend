import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { getDistanceFromCompany } from '@/utils/calcDistance'
import {
  LIKE_IMG_URL,
  NOT_LIKE_BTN_IMG_URL,
  LIKED_BTN_IMG_URL,
} from '@/app/(header-layout)/place/constants'
import { LatLngType } from '@/utils/calcDistance'
import {
  RestaurantType,
  RestaurantListType,
} from '@/app/(header-layout)/place/types/restaurantType'

export default function NarrowCard({
  restaurantList,
  onFocusChange,
  onCenterChange,
  showMapTrue,
}: {
  restaurantList: RestaurantListType
  onFocusChange?: (restaurant: RestaurantType | null) => void
  onCenterChange?: (center: LatLngType) => void
  showMapTrue?: () => void
}) {
  const flexItemsCenter = 'body5 flex items-center'

  const setFocusChange = (restaurant: RestaurantType | null) => {
    if (!restaurant || !onFocusChange || !onCenterChange || !showMapTrue) return
    onFocusChange(restaurant)
    onCenterChange({ lat: restaurant.lat, lng: restaurant.lng })
    showMapTrue()
  }

  return (
    <>
      {restaurantList?.map((restaurant) => (
        <div
          key={restaurant.id}
          className="grid grid-cols-[1fr_2fr_0.5fr] border-b border-gray-50 px-3 py-4"
        >
          <div>
            <Image
              src={restaurant.imageUrl}
              alt={`${restaurant.name} 이미지`}
              width={100}
              height={100}
              className="h-25 min-h-20 w-25 min-w-20 rounded-sm object-cover"
            />
          </div>
          <ul className="flex flex-col gap-2.5 pl-2">
            <li className={clsx(flexItemsCenter, 'body5 gap-1')}>
              <button
                type="button"
                className="body2-sb text-left"
                onClick={() => onFocusChange && setFocusChange(restaurant)}
              >
                {restaurant.name}
              </button>
              {restaurant.popular && (
                <span className="body6 rounded-lg bg-purple-50 px-2 py-1 text-purple-300">
                  인기
                </span>
              )}
            </li>
            <li className={clsx(flexItemsCenter, 'body5 gap-1')}>
              <div className={clsx(flexItemsCenter, 'gap-0.5')}>
                <Image src={LIKE_IMG_URL} alt="좋아요 수 아이콘" width={12} height={12} />
                <span className="text-purple-500">{restaurant.likes}</span>
              </div>
              <span className="text-gray-600">{restaurant.category}</span>
            </li>
            <li className={clsx(flexItemsCenter, 'body5 gap-1')}>
              <span className="text-purple-300">
                {getDistanceFromCompany({ lat: restaurant.lat, lng: restaurant.lng }) ??
                  restaurant.distance}
                m
              </span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-600">
                평균{' '}
                <b className="text-gray-700">{(+restaurant.averagePrice).toLocaleString()}원</b>
              </span>
            </li>
            <li>
              <ul className={clsx(flexItemsCenter, 'body6 gap-1')}>
                {restaurant.menus.map((menu) => (
                  <li key={menu} className="rounded-lg bg-gray-50 px-2 py-1 text-gray-600">
                    {menu}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="flex items-start justify-end">
            {/* TODO: API 연동되면 onClick에 좋아요 토글 기능 추가 */}
            <button type="button">
              <span className="sr-only">좋아요 버튼</span>
              <Image
                src={restaurant.liked ? LIKED_BTN_IMG_URL : NOT_LIKE_BTN_IMG_URL}
                alt="좋아요 버튼 아이콘"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
