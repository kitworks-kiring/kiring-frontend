import Image from 'next/image'
import React from 'react'
import Like from '@/assets/like.svg'
import LikedButton from '@/assets/liked-button.svg'
import LikeButton from '@/assets/like-button.svg'
import clsx from 'clsx'

export default function RestaurantWideCard({
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
          <div key={id} className="grid gap-3 border-b border-gray-50 px-3 py-4">
            <Image
              src={imageUrl}
              alt={`${name} 이미지`}
              width={414}
              height={210}
              layout="responsive"
              className="h-38 max-h-52 w-88 max-w-120 rounded-sm object-cover"
            />
            <ul className="flex flex-col gap-2">
              <li className="flex justify-between">
                <div className={clsx(flexItemsCenter, 'body5 gap-1')}>
                  <span className="body2-sb">{name}</span>
                  {popular && (
                    <span className="body6 rounded-lg bg-purple-50 px-2 py-1 text-purple-300">
                      인기
                    </span>
                  )}
                </div>
                <div className="flex justify-end">{liked ? <LikedButton /> : <LikeButton />}</div>
              </li>
              <li className={clsx(flexItemsCenter, 'gap-2 text-gray-600')}>
                <div className={clsx(flexItemsCenter, 'gap-0.5')}>
                  <Like />
                  <span className="body4 text-purple-500">{likes}</span>
                </div>
                <span>{category}</span>
                <span>/</span>
                <span className="text-purple-300">{distance}m</span>
                <span>/</span>
                <span>
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
          </div>
        ),
      )}
    </>
  )
}
