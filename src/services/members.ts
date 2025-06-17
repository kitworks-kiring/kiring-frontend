import ApiClient from '@/lib/api/client'
import { MembersResponse, MembersImagesResponse } from '@/app/(full-layout)/(main)/types/member'

export const getTeamMembers = (teamId: number): Promise<MembersResponse> => {
  return ApiClient.get(`/member/teams/members?teamId=${teamId}`)
}

export const getMemberAll = (): Promise<MembersResponse> => {
  return ApiClient.get('/member/all')
}

export const getMemberImages = (): Promise<MembersImagesResponse> => {
  return ApiClient.get('/member/members/images')
}
