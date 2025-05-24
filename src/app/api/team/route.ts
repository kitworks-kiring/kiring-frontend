import { NextResponse } from 'next/server'
import { getTeamLength } from '@/db/team'
import { wrapApiResponse } from '@/lib/utils/wrapApiResponse'
import { buildRspStatus } from '@/lib/utils/responseStatus'

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: 등록된 팀 수 조회
 *     description: 등록된 팀의 개수를 반환합니다.
 *     tags:
 *       - Team
 *     responses:
 *       200:
 *         description: 성공적으로 팀 수를 반환합니다.
 */

export async function GET() {
  const [data, error] = await wrapApiResponse(
    async () => {
      const count = await getTeamLength()
      return { count }
    },
    {
      failureMessage: '팀 수 조회 실패',
      onError: (e) => console.error('[GET /api/team]', e),
    },
  )
  const rspStatus = buildRspStatus(error)
  return NextResponse.json({ data, rspStatus }, { status: rspStatus.code })
}
