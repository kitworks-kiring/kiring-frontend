import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Like from '@/assets/like.svg'
import LikeToggleButton from '@/components/ui/LikeToggleButton'
import { RestaurantType } from '@/app/(header-layout)/place/types/restaurantType'

interface PlaceCardProps {
  restaurant: RestaurantType
}

export default function PlaceCard({ restaurant }: PlaceCardProps) {
  const router = useRouter()
  const moveToPlace = (restaurant: RestaurantType) => {
    if (!restaurant || !Object.keys(restaurant).length) return
    sessionStorage.setItem('restaurantParams', JSON.stringify(restaurant))
    router.push('/place')
  }

  return (
    <div key={restaurant.placeId} className="flex flex-shrink-0 flex-col gap-2">
      <button type="button" onClick={() => moveToPlace(restaurant)}>
        <Image
          src={restaurant.imageUrl}
          alt={`${restaurant?.name || '레스토랑'} 이미지`}
          width={150}
          height={150}
          className="h-[150px] w-[150px] rounded-[12px] object-cover"
        />
      </button>
      <div>
        <div className="flex items-center justify-between">
          <span className="body2 text-basic-black block w-31 truncate">{restaurant.name}</span>
          <LikeToggleButton isLiked={restaurant.isLiked} placeId={restaurant.placeId} />
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-[2px]">
            <Like />
            <span className="body5 text-purple-500">{restaurant.likeCount}</span>
          </div>
          <span className="body6 mt-[1px] text-gray-600">
            {restaurant.kiringCategory.join(' · ')}
          </span>
        </div>
      </div>
    </div>
  )
}
