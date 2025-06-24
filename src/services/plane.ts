import ApiClient from '@/lib/api/client'
import {
  PlaneMessage,
  PlaneSendMessage,
  PlaneTodayMessage,
} from '@/app/(header-layout)/mypage/types/plane'

export const getPlaneRead = (): Promise<PlaneMessage[]> => {
  return ApiClient.get('/plane/read')
}

export const postPlaneSendMessage = (payload: PlaneSendMessage): Promise<PlaneSendMessage> => {
  return ApiClient.post('/plane/send-message', payload)
}

export const getPlaneTodayMessage = (): Promise<PlaneTodayMessage> => {
  return ApiClient.get('/plane/today/message')
}
