import { NextResponse } from 'next/server'
import { getTeamLength } from '@/db/team'
import { wrapApiResponse } from '@/lib/utils/wrapApiResponse'
import { buildRspStatus } from '@/lib/utils/responseStatus'

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
