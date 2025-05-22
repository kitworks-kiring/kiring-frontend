import { prisma } from '@/lib/prisma'

export const getTeamLength = () => {
  return prisma.team.count()
}
