import { MemberMeType } from '@/app/types/memberType'
import ApiClient from '@/lib/api/client'

export const getMemberMe = (): Promise<{ member: MemberMeType }> => {
  return ApiClient.get<{ member: MemberMeType }>('/member/me')
}

export const getMemberById = (memberId: number): Promise<{ member: MemberMeType }> => {
  return ApiClient.get<{ member: MemberMeType }>(`/member/${memberId}`)
}
