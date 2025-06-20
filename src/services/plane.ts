import ApiClient from '@/lib/api/client'
import { PlaneMessage } from '@/app/(header-layout)/profile/constants'

export const getPlaneRead = (): Promise<PlaneMessage[]> => {
  return ApiClient.get('/plane/read')
}
