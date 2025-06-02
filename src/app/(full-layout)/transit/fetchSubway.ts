import { SubwayArrivalType } from '@/app/(full-layout)/transit/types/subwayType'

const ERROR_MESSAGE = '일일 호출건수'
const API_KEYS = [
  process.env.NEXT_PUBLIC_SUBWAY_API_KEY_0,
  process.env.NEXT_PUBLIC_SUBWAY_API_KEY_1,
  process.env.NEXT_PUBLIC_SUBWAY_API_KEY_2,
  process.env.NEXT_PUBLIC_SUBWAY_API_KEY_3,
  process.env.NEXT_PUBLIC_SUBWAY_API_KEY_4,
]

export default async function fetchSubway() {
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

      // 호출 횟수 초과 에러 발생 시
      if (res.message && res.message.includes(ERROR_MESSAGE)) {
        console.log(`API_KEY_${i}: 호출 횟수 초과`)
        lastError = new Error(res.message)
        continue // 다음 키로 시도
      }
      const { realtimeArrivalList } = res
      // 호선별 데이터 필터링
      const subwayNum2: SubwayArrivalType[] = realtimeArrivalList.filter(
        (item: SubwayArrivalType) => item.subwayId === '1002',
      )
      const subwayNum9: SubwayArrivalType[] = realtimeArrivalList.filter(
        (item: SubwayArrivalType) => item.subwayId === '1009',
      )

      /**
       * 방면별로 묶고, 각 방면에서 도착이 빠른 2개만 추출
       * @param arr 호선별 데이터 배열
       * @returns Record<방면, 데이터[]>
       */
      function groupByDirection(arr: SubwayArrivalType[]): Record<
        string,
        {
          barvlDt: string
          recptnDt: string
          btrainSttus: string
          destination: string
          ordkey: string
          korDirection: string
        }[]
      > {
        const grouped = arr.reduce(
          (acc: Record<string, SubwayArrivalType[]>, item) => {
            const line = item.trainLineNm || ''
            const match = line.match(/(.+?행)\s*-\s*([^()]+방면)/)
            let directionName = '기타'
            let korDirection = '기타'
            let destination = ''
            if (match) {
              destination = match[1].trim()
              korDirection = match[2].trim() // ex: '성수(외선)방면'
              directionName = korDirection.replace(/방면$/, ' 방면')
            }
            const newItem = {
              barvlDt: item.barvlDt,
              recptnDt: item.recptnDt,
              btrainSttus: item.btrainSttus,
              destination: destination,
              ordkey: item.ordkey,
              korDirection: korDirection,
            }
            if (!acc[directionName]) acc[directionName] = []
            acc[directionName].push(newItem)
            return acc
          },
          {} as Record<string, SubwayArrivalType[]>,
        )
        Object.keys(grouped).forEach((key) => {
          grouped[key] = grouped[key]
            .sort((a, b) => Number(a.barvlDt) - Number(b.barvlDt))
            .slice(0, 2)
        })
        return grouped
      }

      const groupedNum2 = groupByDirection(subwayNum2)
      const groupedNum9 = groupByDirection(subwayNum9)

      // 2호선, 9호선, 데이터 생성 시각 반환
      return { groupedNum2, groupedNum9, receptnDt: realtimeArrivalList[0].recptnDt }
    } catch (error) {
      lastError = error
      continue
    }
  }
  // 모든 키가 실패한 경우
  console.error(lastError)
  return null
}
