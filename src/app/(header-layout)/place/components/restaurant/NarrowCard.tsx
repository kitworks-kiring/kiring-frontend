import Image from 'next/image'
import clsx from 'clsx'
import LikeToggleButton from '@/components/ui/LikeToggleButton'
import { LatLngType } from '@/utils/calcDistance'
import { LIKE_IMG_URL } from '@/app/(header-layout)/place/constants'
import { RestaurantType } from '@/app/(header-layout)/place/types/restaurantType'

export default function NarrowCard({
  restaurant,
  idx,
  onFocusChange,
  onCenterChange,
  onClickListCard,
  isFloating,
}: {
  restaurant: RestaurantType
  idx?: number
  onFocusChange?: (restaurant: RestaurantType | null) => void
  onCenterChange?: (center: LatLngType) => void
  onClickListCard?: () => void
  isFloating?: boolean
}) {
  const flexItemsCenter = 'body5 flex items-center'

  const setFocusChange = (restaurant: RestaurantType | null) => {
    if (!restaurant || !onFocusChange || !onCenterChange || !onClickListCard) return
    onFocusChange(restaurant)
    onCenterChange({ lat: restaurant.latitude, lng: restaurant.longitude })
    onClickListCard()
  }

  return (
    <div className="grid grid-cols-[1fr_2fr_0.5fr] border-b border-gray-50 px-3 py-4">
      <button type="button" onClick={() => onFocusChange && setFocusChange(restaurant)}>
        <Image
          src={restaurant.imageUrl}
          alt={`${restaurant.name} 이미지`}
          width={100}
          height={100}
          priority={idx ? idx <= 6 : true}
          className={clsx(
            'h-25 min-h-20 w-25 min-w-20 rounded-sm object-cover',
            isFloating && 'cursor-default',
          )}
        />
      </button>
      <ul className={clsx('flex flex-col gap-2.5 max-[400px]:pl-4', isFloating ? 'pl-4' : 'pl-1')}>
        <li className="flex items-start">
          <button
            type="button"
            className={clsx(
              'body2-sb text-left max-[400px]:max-w-[80%]',
              isFloating && 'cursor-default max-[400px]:max-w-[75%]',
            )}
            onClick={() => onFocusChange && setFocusChange(restaurant)}
          >
            {restaurant.name}
          </button>
          {restaurant.likeCount >= 10 && (
            <span className="body6 ml-1 rounded-lg bg-purple-50 px-2 py-1 text-purple-300">
              인기
            </span>
          )}
        </li>
        <li className={clsx(flexItemsCenter, 'body5 gap-1')}>
          <div className={clsx(flexItemsCenter, 'gap-0.5')}>
            <Image
              src={LIKE_IMG_URL}
              alt="좋아요 수 아이콘"
              width={12}
              height={12}
              priority={idx ? idx <= 6 : true}
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
        <LikeToggleButton isLiked={restaurant.isLiked} placeId={restaurant.placeId} />
      </div>
    </div>
  )
}
