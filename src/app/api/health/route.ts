import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: DB, API 상태 체크
 *     description: DB와 API의 상태를 체크합니다.
 *     tags:
 *       - Health Check
 *     responses:
 *       true:
 *         description: 성공적으로 상태를 반환합니다.
 */

export async function GET() {
  const status = {
    app: true, // Next.js 라우트가 동작한다면 기본 true
    db: false, // DB 연결 체크
  }

  try {
    await prisma.team.findFirst() // 가장 간단한 쿼리로 연결 확인
    status.db = true
  } catch (err) {
    console.error('⚠️ DB 연결 실패:', err)
  }

  const isHealthy = Object.values(status).every(Boolean)

  if (!isHealthy) {
    return NextResponse.json({ ok: false, status }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    status,
  })
}
