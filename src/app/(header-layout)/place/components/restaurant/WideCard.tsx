import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { getDistanceFromCompany } from '@/utils/calcDistance'
import {
  LIKE_IMG_URL,
  NOT_LIKE_BTN_IMG_URL,
  LIKED_BTN_IMG_URL,
} from '@/app/(header-layout)/place/constants'
import { RestaurantListType } from '@/app/(header-layout)/place/types/restaurantType'

export default function WideCard({ restaurantList }: { restaurantList: RestaurantListType }) {
  const flexItemsCenter = 'body5 flex items-center'

  return (
    <>
      {restaurantList?.map((restaurant) => (
        <div key={restaurant.id} className="grid gap-3 border-b border-gray-50 px-3 py-4">
          <Image
            src={restaurant.imageUrl}
            alt={`${restaurant.name} 이미지`}
            width={414}
            height={210}
            className="aspect-[2/1] rounded-sm object-cover"
          />
          <ul className="flex flex-col gap-2">
            <li className="flex justify-between">
              <div className={clsx(flexItemsCenter, 'body5 gap-1')}>
                <span className="body2-sb">{restaurant.name}</span>
                {restaurant.popular && (
                  <span className="body6 rounded-lg bg-purple-50 px-2 py-1 text-purple-300">
                    인기
                  </span>
                )}
              </div>
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
            </li>
            <li className={clsx(flexItemsCenter, 'gap-2 text-gray-600')}>
              <div className={clsx(flexItemsCenter, 'gap-0.5')}>
                <Image src={LIKE_IMG_URL} alt="좋아요 수 아이콘" width={12} height={12} />
                <span className="body4 text-purple-500">{restaurant.likes}</span>
              </div>
              <span>{restaurant.category}</span>
              <span>/</span>
              <span className="text-purple-300">
                {getDistanceFromCompany({ lat: restaurant.lat, lng: restaurant.lng }) ??
                  restaurant.distance}
                m
              </span>
              <span>/</span>
              <span>
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
        </div>
      ))}
    </>
  )
}
