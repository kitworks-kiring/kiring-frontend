import { NextResponse } from 'next/server'
import { DdarungiStation } from '@/app/(full-layout)/transit/types/bicycleType'

// 조회할 따릉이 거치대 ID 목록 (서울시 API의 stationId)
const TARGET_STATION_IDS = ['3187', '426', '295', '422', '293']

export async function GET() {
  try {
    // 각 거치대 ID별로 비동기 fetch 요청 생성
    const fetchStationPromises = TARGET_STATION_IDS.map(async (stationId) => {
      const url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/bikeList/1/5/ST-${stationId}`
      const res = await fetch(url)
      const data = await res.json()
      // 데이터가 없거나 응답이 비정상일 경우
      if (
        !data.rentBikeStatus ||
        !data.rentBikeStatus.row ||
        data.rentBikeStatus.row.length === 0
      ) {
        return null
      }
      return data.rentBikeStatus.row[0] as DdarungiStation
    })

    // 모든 fetch가 끝날 때까지 대기
    const stations = (await Promise.all(fetchStationPromises)).filter(Boolean) as DdarungiStation[]
    return NextResponse.json({ stations, createdAt: Date.now() })
  } catch (e) {
    return NextResponse.json({ error: '데이터를 가져오는데 실패했습니다.' }, { status: 500 })
  }
}
