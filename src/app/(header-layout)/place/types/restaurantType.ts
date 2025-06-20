import { LatLngType } from '@/utils/calcDistance'

// TODO: 추후 삭제 예정
export interface RestaurantType extends LatLngType {
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
}

export type RestaurantListType = RestaurantType[]

export interface RestaurantMapProps {
  center: LatLngType
  onCenterChange: (center: LatLngType) => void
  restaurantList: RestaurantListType
  focusedRestaurant: RestaurantType | null
  onFocusChange: (restaurant: RestaurantType | null) => void
}

export interface PageNationResponseType {
  empty: boolean
  first: boolean
  hasNext: boolean
  hasPrevious: boolean
  last: boolean
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
}

export interface RestaurantNearbyListResponseType extends PageNationResponseType {
  content: RealRestaurantType[]
}

/**
 * 맛집 응답 타입
 * TODO: 추후 RealRestaurantType -> RestaurantType 으로 변경 예정
 */
export interface RealRestaurantType extends LatLngType {
  address: string
  categories: string[]
  distanceInMeters: number
  imageUrl: string
  isLiked: boolean
  kiringCategory: string[]
  latitude: number
  likeCount: number
  longitude: number
  name: string
  phoneNumber: string
  placeId: number
}

export interface RestaurantNearbyListResponseType {
  content: RealRestaurantType[]
  empty: boolean
  hasNext: boolean
}
export interface RestaurantNearbyListParams {
  lat?: number
  lon?: number
  radius?: number
  categoryName?: string
  page?: number
  size?: number
  sort?: string
}
