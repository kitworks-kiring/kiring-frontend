import { useState, useRef } from 'react'
import { Map, ZoomControl, MapMarker } from 'react-kakao-maps-sdk'
import {
  RestaurantMapProps,
  CalcDistanceType,
} from '@/app/(header-layout)/place/types/restaurantType'

export default function RestaurantMap({
  center,
  onCenterChange,
  restaurantList,
}: RestaurantMapProps) {
  const [hoveredId, sethoveredId] = useState<number | null>(null)

  const mapRef = useRef<kakao.maps.Map>(null)
  const THRESHOLD = 30 // 중심 좌표 변화 감지 임계값(m)

  // 하버사인 공식: 두 점의 위도와 경도를 이용하여 두 점 사이의 거리를 계산하는 공식
  const calcDistance = ({ oldLat, oldLng, newLat, newLng }: CalcDistanceType) => {
    const earthRadius = 6371000 // 지구의 반지름(m)
    const dLat = (newLat - oldLat) * (Math.PI / 180) // 위도 차이를 라디안으로 변환
    const dLng = (newLng - oldLng) * (Math.PI / 180) // 경도 차이를 라디안으로 변환
    const haversine =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(oldLat * (Math.PI / 180)) *
        Math.cos(newLat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2) // 두 점 사이의 거리 계산을 위한 중간값
    const angularDistance = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)) // 두 점을 잇는 원의 중심각(라디안 단위)
    return earthRadius * angularDistance // 두 점 사이의 거리
  }

  const getMapCenterPoint = () => {
    const map = mapRef.current
    if (!map) return
    const centerObj = map.getCenter()
    const newLat = centerObj.getLat()
    const newLng = centerObj.getLng()
    const distance = calcDistance({
      oldLat: center.lat,
      oldLng: center.lng,
      newLat,
      newLng,
    })
    if (distance > THRESHOLD) {
      onCenterChange({ lat: newLat, lng: newLng })
      // console.log('restaurantList', restaurantList)
    }
  }

  return (
    <Map
      ref={mapRef}
      center={center}
      style={{
        width: '100%',
        height: '100%',
      }}
      level={3}
      onIdle={getMapCenterPoint}
    >
      {restaurantList.map((restaurant) => (
        <MapMarker
          key={restaurant.id}
          position={{ lat: restaurant.lat, lng: restaurant.lng }}
          title={restaurant.name}
          image={{
            src: 'https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/ico-map-pin.svg', // 마커 이미지 URL
            size: { width: 24, height: 35 }, // 마커 이미지 크기
            options: {
              offset: { x: 5, y: 40 }, // 마커 이미지의 기준점 위치
            },
          }}
          onClick={(marker) => mapRef.current?.panTo(marker.getPosition())} // 마커 클릭 시 해당 위치로 이동
          onMouseOver={() => sethoveredId(restaurant.id)}
          onMouseOut={() => sethoveredId(null)}
        >
          {hoveredId === restaurant.id && (
            <div style={{ padding: '5px', backgroundColor: 'white', borderRadius: '5px' }}>
              {restaurant.name}
            </div>
          )}
        </MapMarker>
      ))}
      <ZoomControl position={'RIGHT'} />
    </Map>
  )
}
