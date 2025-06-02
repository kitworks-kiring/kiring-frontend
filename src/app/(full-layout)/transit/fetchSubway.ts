import { SubwayArrivalType } from '@/app/(full-layout)/transit/types/subwayType'

export default async function fetchSubway() {
  try {
    const response = await fetch('/api/subway')

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API 오류:', errorData)
      return null
    }

    const res = await response.json()

    if (!res.realtimeArrivalList) {
      console.error('응답 형식이 올바르지 않습니다:', res)
      return null
    }

    const { realtimeArrivalList } = res
    // 호선별 데이터 필터링
    const subwayNum2: SubwayArrivalType[] = realtimeArrivalList.filter(
      (item: SubwayArrivalType) => item.subwayId === '1002',
    )
    const subwayNum9: SubwayArrivalType[] = realtimeArrivalList.filter(
      (item: SubwayArrivalType) => item.subwayId === '1009',
    )

    if (subwayNum2.length === 0 && subwayNum9.length === 0) {
      console.error('2호선과 9호선의 지하철 정보가 없습니다')
      return null
    }

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
    console.error('지하철 정보를 가져오는데 실패했습니다:', error)
    return null
  }
}
