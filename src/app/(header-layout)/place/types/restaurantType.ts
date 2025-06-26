export interface PaginationResponseType {
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

export interface RestaurantType {
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

export interface RestaurantNearbyListResponseType extends PaginationResponseType {
  content: RestaurantType[]
}

export interface RestaurantNearbyListParamsType {
  lat?: number
  lon?: number
  radius?: number
  categoryName?: string
  page?: number
  size?: number
  sort?: string
}
