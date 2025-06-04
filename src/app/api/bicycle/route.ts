import { NextResponse } from 'next/server'
import { DdarungiStation } from '@/app/(full-layout)/transit/types/bicycleType'

// 조회할 따릉이 거치대 ID 목록 (서울시 API의 stationId)
const TARGET_STATION_IDS = ['3187', '426', '295', '422', '293']

export async function GET() {
  try {
    // 각 거치대 ID별로 비동기 fetch 요청 생성
    const fetchStationPromises = TARGET_STATION_IDS.map(async (stationId) => {
      try {
        const url = `http://openapi.seoul.go.kr:8088/${process.env.SEOUL_API_KEY}/json/bikeList/1/5/ST-${stationId}`
        const res = await fetch(url)

        if (!res.ok) {
          console.error(`${stationId}번 정류장 응답 오류:`, res.status)
          return null
        }

        const text = await res.text()
        if (!text) {
          console.error(`${stationId}번 정류장 응답이 비어있습니다`)
          return null
        }

        let data
        try {
          data = JSON.parse(text)
        } catch (error) {
          console.error('JSON 파싱 오류:', error)
          console.error(`${stationId}번 정류장 JSON 파싱 오류:`, text)
          return null
        }

        // 데이터가 없거나 응답이 비정상일 경우
        if (
          !data.rentBikeStatus ||
          !data.rentBikeStatus.row ||
          data.rentBikeStatus.row.length === 0
        ) {
          console.error(`${stationId}번 정류장 데이터가 없습니다`)
          return null
        }

        return data.rentBikeStatus.row[0] as DdarungiStation
      } catch (error) {
        console.error(`${stationId}번 정류장 처리 중 오류:`, error)
        return null
      }
    })

    // 모든 fetch가 끝날 때까지 대기
    const stations = (await Promise.all(fetchStationPromises)).filter(Boolean) as DdarungiStation[]

    if (stations.length === 0) {
      return NextResponse.json(
        { error: '모든 정류장에서 데이터를 가져오는데 실패했습니다' },
        { status: 404 },
      )
    }

    return NextResponse.json({ stations, createdAt: Date.now() })
  } catch (error) {
    console.error('자전거 API 전체 오류:', error)
    return NextResponse.json(
      {
        error: '자전거 정보를 가져오는데 실패했습니다',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
