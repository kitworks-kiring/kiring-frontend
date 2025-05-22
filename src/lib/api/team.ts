import ApiClient from './client'

export const getTeamLength = async (): Promise<number> => {
  const res = await ApiClient.get<{ count: number }>('/api/team')
  return res.count
}
