import { LatLngType } from '@/utils/calcDistance'

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
}

export interface CalcDistanceType {
  oldLat: number
  oldLng: number
  newLat: number
  newLng: number
}
