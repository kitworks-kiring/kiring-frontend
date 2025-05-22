import { NextResponse } from 'next/server'
import { getTeamLength } from '@/db/team'

export async function GET() {
  try {
    const count = await getTeamLength()
    return NextResponse.json({ count })
  } catch (error) {
    console.error('[GET /api/team]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
