import ApiClient from '@/lib/api/client'
import { MembersResponse } from '@/app/(full-layout)/(main)/types/member'

export const getTeamMembers = (teamId: number): Promise<MembersResponse> => {
  return ApiClient.get(`/member/teams/members?teamId=${teamId}`)
}

export const getMemberAll = (): Promise<MembersResponse> => {
  return ApiClient.get('/member/all')
}
