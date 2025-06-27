import Image from 'next/image'
import clsx from 'clsx'
import LikeToggleButton from '@/components/ui/LikeToggleButton'
import { LatLngType } from '@/utils/calcDistance'
import { LIKE_IMG_URL } from '@/app/(header-layout)/place/constants'
import { RestaurantType } from '@/app/(header-layout)/place/types/restaurantType'

export default function WideCard({
  restaurant,
  idx,
  onFocusChange,
  onCenterChange,
  onClickListCard,
}: {
  restaurant: RestaurantType
  idx?: number
  onFocusChange?: (restaurant: RestaurantType | null) => void
  onCenterChange?: (center: LatLngType) => void
  onClickListCard?: () => void
}) {
  const flexItemsCenter = 'body5 flex items-center'

  const setFocusChange = (restaurant: RestaurantType | null) => {
    if (!restaurant || !onFocusChange || !onCenterChange || !onClickListCard) return
    onFocusChange(restaurant)
    onCenterChange({ lat: restaurant.latitude, lng: restaurant.longitude })
    onClickListCard()
  }

  return (
    <div className="grid gap-3 border-b border-gray-50 px-3 py-4">
      <button type="button" onClick={() => onFocusChange && setFocusChange(restaurant)}>
        <Image
          src={restaurant.imageUrl}
          alt={`${restaurant.name} 이미지`}
          width={414}
          height={210}
          priority={idx ? idx <= 6 : true}
          className="aspect-[2/1] rounded-sm object-cover"
        />
      </button>
      <ul className="flex flex-col gap-2">
        <li className="flex justify-between">
          <div className={clsx(flexItemsCenter, 'body5 gap-1')}>
            <button
              type="button"
              className="body2-sb"
              onClick={() => onFocusChange && setFocusChange(restaurant)}
            >
              {restaurant.name}
            </button>
            {restaurant.likeCount >= 10 && (
              <span className="body6 ml-1 rounded-lg bg-purple-50 px-2 py-1 text-purple-300">
                인기
              </span>
            )}
          </div>
          <div className="flex items-start justify-end">
            <LikeToggleButton isLiked={restaurant.isLiked} placeId={restaurant.placeId} />
          </div>
        </li>
        <li className={clsx(flexItemsCenter, 'gap-2 text-gray-600')}>
          <div className={clsx(flexItemsCenter, 'gap-0.5')}>
            <Image
              src={LIKE_IMG_URL}
              alt="좋아요 수 아이콘"
              width={12}
              height={12}
              priority={idx ? idx <= 6 : true}
            />
            <span className="body4 text-purple-500">{restaurant.likeCount}</span>
          </div>
          <span>{restaurant.categories.join(' · ')}</span>
          <span>/</span>
          <span className="text-purple-300">
            {Math.floor(restaurant.distanceInMeters).toLocaleString()}m
          </span>
          <span>/</span>
          <span>{restaurant.address.slice(8)}</span>
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
    </div>
  )
}
