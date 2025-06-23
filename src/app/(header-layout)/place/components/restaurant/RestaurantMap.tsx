import { useRef } from 'react'
import { Map as KakaoMap, ZoomControl, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk'
import clsx from 'clsx'
import { getCalcDistance } from '@/utils/calcDistance'
// import NarrowCard from '@/app/(header-layout)/place/components/restaurant/NarrowCard'
import { MARKER_IMG_URL, LIKE_IMG_URL } from '@/app/(header-layout)/place/constants'
import {
  RestaurantMapProps,
  RestaurantType,
} from '@/app/(header-layout)/place/types/restaurantType'
import Image from 'next/image'

export default function RestaurantMap({
  center,
  onCenterChange,
  restaurantList,
  focusedRestaurant,
  onFocusChange,
}: RestaurantMapProps) {
  const mapRef = useRef<kakao.maps.Map>(null)
  const isProgrammaticMove = useRef(false) // 프로그램 이동(↔ 사용자 이동) 여부를 판단하기 위한 ref
  const THRESHOLD = 30 // 중심 좌표 변화 감지 임계값(m)

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
    }
  }

  const onMarkerClick = (marker: kakao.maps.Marker, restaurant: RestaurantType) => {
    isProgrammaticMove.current = true
    mapRef.current?.panTo(marker.getPosition())
    onFocusChange(restaurant)
  }

  return (
    <>
      <KakaoMap
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
          <div key={restaurant.placeId} className="relative">
            <MapMarker
              key={`marker-${restaurant.placeId}`}
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
              title={restaurant.name}
              image={{
                src: MARKER_IMG_URL,
                size: { width: 24, height: 35 },
              }}
              onClick={(marker) => onMarkerClick(marker, restaurant)}
            />
            <CustomOverlayMap
              key={`overlay-${restaurant.placeId}`}
              position={{ lat: restaurant.lat, lng: restaurant.lng }}
              zIndex={5}
              xAnchor={0}
              yAnchor={1.15}
            >
              <div
                className={clsx(
                  'position-centered-x',
                  focusedRestaurant?.placeId === restaurant.placeId ? 'visible' : 'invisible',
                )}
              >
                <div className="flex-col-center gap-0.5 rounded-3xl border-2 border-purple-500 bg-white px-4 py-2">
                  <span className="body3">{restaurant.name}</span>
                  <div className="flex-row-center gap-0.5">
                    <Image
                      src={LIKE_IMG_URL}
                      alt="좋아요 수 아이콘"
                      width={14}
                      height={14}
                      className="object-contain"
                    />
                    <span className="body4-sb text-purple-500">{restaurant.likes}</span>
                  </div>
                </div>
              </div>
            </CustomOverlayMap>
          </div>
        ))}
        <ZoomControl position={'RIGHT'} />
      </KakaoMap>
      {/* <div className="position-centered-x absolute bottom-10 z-50 w-9/10 rounded-l-2xl rounded-r-2xl bg-white px-2 shadow-lg">
        {focusedRestaurant && <NarrowCard restaurantList={[focusedRestaurant]} />}
      </div> */}
    </>
  )
}
