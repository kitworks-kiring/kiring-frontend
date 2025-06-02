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
  let lastError: Error | null = null

  for (let i = 0; i < MAX_KEY_INDEX; i++) {
    const apiKey = API_KEYS[i]
    if (!apiKey) {
      console.error(`${i}번 API 키가 정의되지 않았습니다`)
      continue
    }

    try {
      const response = await fetch(
        `http://swopenapi.seoul.go.kr/api/subway/${apiKey}/json/realtimeStationArrival/1/20/%EB%8B%B9%EC%82%B0`,
      )

      if (!response.ok) {
        throw new Error(`HTTP 오류! 상태 코드: ${response.status}`)
      }

      const res = await response.json()

      if (res.message?.includes(ERROR_MESSAGE)) {
        console.log(`${i}번 API 키: 호출 횟수 초과`)
        lastError = new Error(res.message)
        continue
      }

      if (!res.realtimeArrivalList) {
        throw new Error('응답 형식이 올바르지 않습니다: missing realtimeArrivalList')
      }

      return NextResponse.json(res)
    } catch (error) {
      console.error(`${i}번 API 키 오류:`, error)
      lastError = error instanceof Error ? error : new Error(String(error))
      continue
    }
  }

  return NextResponse.json(
    {
      error: lastError?.message || '지하철 정보를 가져오는데 실패했습니다',
      details: lastError?.stack,
    },
    { status: 500 },
  )
}
