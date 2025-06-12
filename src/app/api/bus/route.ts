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
      console.log(`[BUS API] 시도 중인 키 인덱스: ${idx}`)
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
          // API 응답에서 버스 도착 정보(itemList)를 가져와서 가공
          const buses = (data.msgBody.itemList || [])
            .slice()
            // 1. 도착 예정 시간(exps1) 기준으로 오름차순 정렬
            .sort((a: any, b: any) => {
              const t1 = Number(a.exps1) || 99999 // exps1: 남은 시간(초), 값이 없으면 큰 값으로 처리
              const t2 = Number(b.exps1) || 99999
              return t1 - t2
            })
            // 2. 필요한 필드만 추출해서 새로운 객체로 반환
            .map((bus: any) => {
              const filtered: any = {}
              FIELDS.forEach((key) => {
                filtered[key] = bus[key]
              })
              return filtered
            })
          // buses 배열에서 mkTm(생성시각) 중 가장 최근(최대값) 구하기
          const mkTm =
            buses.length > 0
              ? buses.reduce((max: any, cur: any) => {
                  // mkTm이 문자열(숫자)로 들어옴. 숫자로 비교
                  return Number(cur.mkTm) > Number(max.mkTm) ? cur : max
                }, buses[0]).mkTm
              : ''

          return { stationName: station.name, mkTm, buses }
        }),
      )
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
