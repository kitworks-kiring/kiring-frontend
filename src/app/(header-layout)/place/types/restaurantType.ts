export interface RestaurantType {
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
