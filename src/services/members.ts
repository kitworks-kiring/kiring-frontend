import ApiClient from '@/lib/api/client'
import { TeamMembersResponse } from '@/app/(full-layout)/(main)/types/member'

export const getTeamMembers = (teamId: number): Promise<TeamMembersResponse> => {
  return ApiClient.get(`/member/teams/members?teamId=${teamId}`)
}
