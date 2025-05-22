import ApiClient from './client'

export const getTeamLength = async () => {
  return await ApiClient.get<{ count: number }>('/api/team')
}
