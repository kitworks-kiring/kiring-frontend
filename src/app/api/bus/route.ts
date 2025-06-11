import { NextResponse } from 'next/server'

const STATIONS = [
  { name: '당산역삼성래미안아파트 (당산역 방면)', stId: '118000089' },
  { name: '당산역삼성래미안아파트 (삼환아파트 방면)', stId: '118000090' },
]

const FIELDS = [
  'stId',
  'stNm',
  'arsId',
  'busRouteId',
  'busRouteAbrv',
  'routeType',
  'mkTm',
  'stationNm1',
  'traTime1',
  'isArrive1',
  'busType1',
  'exps1',
  'rerdie_Div1',
  'reride_Num1',
  'arrmsg1',
]

export async function GET() {
  const apiKeys = [
    process.env.DATA_GO_KR_API_KEY_0,
    process.env.DATA_GO_KR_API_KEY_1,
    process.env.DATA_GO_KR_API_KEY_2,
    process.env.DATA_GO_KR_API_KEY_3,
    process.env.DATA_GO_KR_API_KEY_4,
  ]
  let lastError: Error | null = null

  // 각 API 키를 순차적으로 시도
  for (const [idx, apiKey] of apiKeys.entries()) {
    if (!apiKey) continue
    try {
      console.log(`[BUS API] 시도 중인 키 인덱스: ${idx}, 값: ${apiKey.slice(0, 8)}...`)
      const results = await Promise.all(
        STATIONS.map(async (station) => {
          // 버스 도착정보 API 호출
          const url = `http://ws.bus.go.kr/api/rest/arrive/getLowArrInfoByStId?serviceKey=${apiKey}&stId=${station.stId}&resultType=json`
          const res = await fetch(url)
          const data = await res.json()
          // 응답 전체 로그 (디버깅용)
          console.log(data)
          // 인증실패 메시지 체크
          if (data?.msgHeader?.headerMsg?.includes('Key인증실패')) {
            console.log(`[BUS API] 인증 실패 메시지: ${data.msgHeader.headerMsg}`)
            throw new Error(data.msgHeader.headerMsg)
          }
          // 필요한 필드만 추출해서 반환
          const buses = (data.msgBody.itemList || [])
            .slice()
            .sort((a: any, b: any) => {
              const t1 = Number(a.traTime1) || 99999
              const t2 = Number(b.traTime1) || 99999
              return t1 - t2
            })
            .map((bus: any) => {
              const filtered: any = {}
              FIELDS.forEach((key) => {
                filtered[key] = bus[key]
              })
              return filtered
            })
          return { stationName: station.name, buses }
        }),
      )
      // 정상적으로 데이터를 받으면 바로 반환
      return NextResponse.json(results)
    } catch (e) {
      // 인증실패 등 에러 발생 시 다음 키로
      lastError = e instanceof Error ? e : new Error(String(e))
      continue
    }
  }
  // 모든 키가 실패한 경우 에러 반환
  return NextResponse.json(
    { error: lastError && 'message' in lastError ? lastError.message : 'API 인증 실패' },
    { status: 500 },
  )
}
