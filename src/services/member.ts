import { MemberMeType } from '@/app/types/memberType'
import ApiClient from '@/lib/api/client'

export const getMemberMe = (): Promise<{ member: MemberMeType }> => {
  return ApiClient.get('/member/me')
}
