import { prisma } from '@/lib/prisma'

export const getTeamLength = async () => {
  const teamLength = await prisma.team.count()
  return teamLength
}
