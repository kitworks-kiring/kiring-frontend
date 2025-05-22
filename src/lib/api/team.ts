import ApiClient from './client'

export const getTeamLength = () => {
  return ApiClient.get<{ count: number }>('/api/team')
}
