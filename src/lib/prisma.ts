import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // 개발 모드에서 쿼리 로그 출력
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
