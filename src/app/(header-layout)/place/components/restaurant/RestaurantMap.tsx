import { useRef } from 'react'
import { Map, ZoomControl, MapMarker } from 'react-kakao-maps-sdk'
import { getCalcDistance } from '@/utils/calcDistance'
import { RestaurantMapProps } from '@/app/(header-layout)/place/types/restaurantType'

export default function RestaurantMap({
  center,
  onCenterChange,
  restaurantList,
}: RestaurantMapProps) {
  const mapRef = useRef<kakao.maps.Map>(null)
  const isProgrammaticMove = useRef(false) // 프로그램 이동(↔ 사용자 이동) 여부를 판단하기 위한 ref
  const THRESHOLD = 30 // 중심 좌표 변화 감지 임계값(m)
  const MARKER_IMG_URL =
    'https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/ico/ico-place-map-pin.svg'

  const getMapCenterPoint = () => {
    if (isProgrammaticMove.current) {
      isProgrammaticMove.current = false // 프로그램 이동 시 처리 건너뛰기
      return
    }

    const map = mapRef.current
    if (!map) return
    const centerObj = map.getCenter()
    const newLat = centerObj.getLat()
    const newLng = centerObj.getLng()
    const distance = getCalcDistance({
      prevCoord: { lat: center.lat, lng: center.lng },
      nextCoord: { lat: newLat, lng: newLng },
    })
    if (distance > THRESHOLD) {
      onCenterChange({ lat: newLat, lng: newLng })
      // console.log('restaurantList', restaurantList)
    }
  }

  const onMarkerClick = (marker: kakao.maps.Marker) => {
    isProgrammaticMove.current = true
    mapRef.current?.panTo(marker.getPosition())
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
            src: MARKER_IMG_URL, // 마커 이미지 URL
            size: { width: 24, height: 35 }, // 마커 이미지 크기
            options: {
              offset: { x: 5, y: 40 }, // 마커 이미지의 기준점 위치
            },
          }}
          onClick={onMarkerClick} // 마커 클릭 시 해당 위치로 이동
        ></MapMarker>
      ))}
      <ZoomControl position={'RIGHT'} />
    </Map>
  )
}
