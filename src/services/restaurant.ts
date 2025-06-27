import {
  RestaurantNearbyListParamsType,
  RestaurantNearbyListResponseType,
} from '@/app/(header-layout)/place/types/restaurantType'
import ApiClient from '@/lib/api/client'
import { COMPANY_COORD } from '@/utils/calcDistance'

export const getRestaurantList = () => {
  return ApiClient.get('/matzip/places')
}

export const getRestaurantNearbyList = ({
  lat,
  lon,
  radius,
  categoryName,
  page,
  size,
  sort,
}: RestaurantNearbyListParamsType): Promise<RestaurantNearbyListResponseType> => {
  const { lat: companyLat, lng: companyLng } = COMPANY_COORD
  const orderBy = sort === 'distance' ? 'asc' : 'desc'
  return ApiClient.get('/matzip/nearby', {
    params: {
      lat: lat ?? companyLat,
      lon: lon ?? companyLng,
      radius,
      categoryName,
      page,
      size,
      sort: `${sort},${orderBy}`,
    },
  })
}

export const likeToggleRestaurant = (placeId: number): Promise<void> => {
  return ApiClient.post(`/matzip/toggle/like/${placeId}`)
}
