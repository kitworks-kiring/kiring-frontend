// SubwayArrival 타입 정의
interface SubwayArrival {
  subwayId: string
  trainLineNm: string
  barvlDt: string
  recptnDt: string
  btrainSttus: string
  ordkey: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // 기타 필드 허용
}

export default async function fetchSubway() {
  try {
    const response = await fetch(
      `http://swopenapi.seoul.go.kr/api/subway/${process.env.NEXT_PUBLIC_SUBWAY_API_KEY}/json/realtimeStationArrival/1/20/%EB%8B%B9%EC%82%B0`,
    )
    const { realtimeArrivalList } = await response.json()

    // 호선별 데이터 필터링
    const subwayNum2: SubwayArrival[] = realtimeArrivalList.filter(
      (item: SubwayArrival) => item.subwayId === '1002',
    )
    const subwayNum9: SubwayArrival[] = realtimeArrivalList.filter(
      (item: SubwayArrival) => item.subwayId === '1009',
    )

    /**
     * 방면별로 묶고, 각 방면에서 도착이 빠른 2개만 추출
     * @param arr 호선별 데이터 배열
     * @returns Record<방면, 데이터[]>
     */
    function groupByDirection(arr: SubwayArrival[]): Record<
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
        (
          acc: Record<
            string,
            {
              barvlDt: string
              recptnDt: string
              btrainSttus: string
              destination: string
              ordkey: string
              korDirection: string
            }[]
          >,
          item,
        ) => {
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
        {} as Record<
          string,
          {
            barvlDt: string
            recptnDt: string
            btrainSttus: string
            destination: string
            ordkey: string
            korDirection: string
          }[]
        >,
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

    return { groupedNum2, groupedNum9 }
  } catch (error) {
    console.error(error)
    return null
  }
}
