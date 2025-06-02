import Image from 'next/image'
import React from 'react'
import Like from '@/assets/like.svg'
import LikedButton from '@/assets/liked-button.svg'
import LikeButton from '@/assets/like-button.svg'
import clsx from 'clsx'

export default function RestaurantCard({
  restaurantList,
}: {
  restaurantList: {
    id: number
    name: string
    imageUrl: string
    category: string
    distance: string
    averagePrice: string
    likes: number
    popular: boolean
    menus: string[]
    liked: boolean
  }[]
}) {
  const flexItemsCenter = 'body5 flex items-center'

  return (
    <>
      {restaurantList?.map(
        ({
          id,
          name,
          imageUrl,
          category,
          distance,
          averagePrice,
          likes,
          popular,
          menus,
          liked,
        }) => (
          <div
            key={id}
            className="grid grid-cols-[1fr_2fr_0.5fr] border-b border-gray-50 px-3 py-4"
          >
            <div>
              <Image
                src={imageUrl}
                alt={`${name} 이미지`}
                width={100}
                height={100}
                className="h-25 min-h-20 w-25 min-w-20 rounded-sm object-cover"
              />
            </div>
            <ul className="flex flex-col gap-2.5 pl-2">
              <li className={clsx(flexItemsCenter, 'body5 gap-1')}>
                <span className="body2-sb">{name}</span>
                {popular && (
                  <span className="body6 rounded-lg bg-purple-50 px-2 py-1 text-purple-300">
                    인기
                  </span>
                )}
              </li>
              <li className={clsx(flexItemsCenter, 'body5 gap-1')}>
                <div className={clsx(flexItemsCenter, 'gap-0.5')}>
                  <Like />
                  <span className="text-purple-500">{likes}</span>
                </div>
                <span className="text-gray-600">{category}</span>
              </li>
              <li className={clsx(flexItemsCenter, 'body5 gap-1')}>
                <span className="text-purple-300">{distance}m</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-600">
                  평균 <b className="text-gray-700">{(+averagePrice).toLocaleString()}원</b>
                </span>
              </li>
              <li>
                <ul className={clsx(flexItemsCenter, 'body6 gap-1')}>
                  {menus.map((menu) => (
                    <li key={menu} className="rounded-lg bg-gray-50 px-2 py-1 text-gray-600">
                      {menu}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <div className="flex justify-end">{liked ? <LikedButton /> : <LikeButton />}</div>
          </div>
        ),
      )}
    </>
  )
}
