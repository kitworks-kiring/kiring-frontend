import ApiClient from '@/lib/api/client'

export const getRestaurantList = () => {
  return ApiClient.get('/matzip/places')
}
