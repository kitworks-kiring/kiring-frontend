import { NextResponse } from 'next/server'

const ERROR_MESSAGE = '일일 호출건수'
const API_KEYS = [
  process.env.SUBWAY_API_KEY_0,
  process.env.SUBWAY_API_KEY_1,
  process.env.SUBWAY_API_KEY_2,
  process.env.SUBWAY_API_KEY_3,
  process.env.SUBWAY_API_KEY_4,
]

export async function GET() {
  const MAX_KEY_INDEX = API_KEYS.length
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastError: any = null

  for (let i = 0; i < MAX_KEY_INDEX; i++) {
    const apiKey = API_KEYS[i]
    try {
      const response = await fetch(
        `http://swopenapi.seoul.go.kr/api/subway/${apiKey}/json/realtimeStationArrival/1/20/%EB%8B%B9%EC%82%B0`,
      )
      const res = await response.json()

      if (res.message?.includes(ERROR_MESSAGE)) {
        console.log(`API_KEY_${i}: 호출 횟수 초과`)
        lastError = new Error(res.message)
        continue
      }

      return NextResponse.json(res)
    } catch (error) {
      lastError = error
      continue
    }
  }

  return NextResponse.json(
    { error: lastError?.message || 'Failed to fetch subway data' },
    { status: 500 },
  )
}
