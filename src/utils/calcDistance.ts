export interface LatLngType {
  lat: number
  lng: number
}

export interface CalcDistanceType {
  prevCoord: LatLngType
  nextCoord: LatLngType
}

export interface WalkingTimeParams {
  version: string
  startX: string
  startY: string
  endX: string
  endY: string
}

// 회사 위치 좌표
export const COMPANY_COORD = {
  lat: 37.53313,
  lng: 126.904091,
}

// 두 좌표(prevCoord, nextCoord)를 받아서 두 점 사이의 거리를 계산하는 함수
export const getCalcDistance = ({ prevCoord, nextCoord }: CalcDistanceType) => {
  const { lat: prevLat, lng: prevLng } = prevCoord
  const { lat: nextLat, lng: nextLng } = nextCoord

  const earthRadius = 6371000 // 지구의 반지름(m)
  const dLat = (nextLat - prevLat) * (Math.PI / 180) // 위도 차이를 라디안으로 변환
  const dLng = (nextLng - prevLng) * (Math.PI / 180) // 경도 차이를 라디안으로 변환
  const haversine =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(prevLat * (Math.PI / 180)) *
      Math.cos(nextLat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2) // 두 점 사이의 거리 계산을 위한 중간값
  const angularDistance = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)) // 두 점을 잇는 원의 중심각(라디안 단위)
  return Math.round(earthRadius * angularDistance) // 두 점 사이의 거리(m)
}

// props로 받은 좌표(lat, lng)를 회사의 좌표와 비교하여 거리를 계산하는 함수
export const getDistanceFromCompany = ({ lat, lng }: LatLngType) => {
  return getCalcDistance({
    prevCoord: { lat: COMPANY_COORD.lat, lng: COMPANY_COORD.lng },
    nextCoord: { lat, lng },
  })
}

export const getWalkingTimeFromCompany = async ({ lat, lng }: LatLngType) => {
  const distance = getDistanceFromCompany({ lat, lng })
  const walkingSpeed = 1.4 // 평균 도보 속도 (m/s)
  const timeInSeconds = Math.round(distance / walkingSpeed) // 거리(m)를 속도(m/s)로 나누어 시간(초) 계산
  return Math.ceil(timeInSeconds / 60) // 분 단위로 반올림하여 반환
}
