import Image from 'next/image'
import { BicycleStationType } from '@/app/(full-layout)/transit/types/bicycleType'
import IcoBicycle from '@/assets/ico-bicycle.svg'
import IcoWalking from '@/assets/ico-walking.svg'
import { StaticMap } from 'react-kakao-maps-sdk'
import { getDistanceFromCompany, getWalkingTimeFromCompany } from '@/utils/calcDistance'
import { useMemo } from 'react'

export default function BicycleGrid({
  index,
  stationName,
  shared,
  parkingBikeTotCnt,
  rackTotCnt,
  stationLatitude,
  stationLongitude,
}: Omit<BicycleStationType, 'stationId'> & { index: number }) {
  const walkingDistance = getDistanceFromCompany({
    lat: Number(stationLatitude),
    lng: Number(stationLongitude),
  })

  const walkingTime = useMemo(() => {
    const time = getWalkingTimeFromCompany({
      lat: Number(stationLatitude),
      lng: Number(stationLongitude),
    })
    return time
  }, [stationLatitude, stationLongitude])

  return (
    <div
      className={`flex gap-3 bg-white px-4 py-3 ${index === 4 ? '' : 'border-b border-gray-50'}`}
    >
      {/* 지도 */}
      <div className="relative box-border h-25 w-25">
        <StaticMap
          center={{
            // 지도의 중심좌표
            lat: Number(stationLatitude),
            lng: Number(stationLongitude),
          }}
          level={4}
          marker={false}
          className="h-25 w-25 rounded-[12px]"
        />
        {/* 마커 */}
        <Image
          src="https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/%E1%84%80%E1%85%AD%E1%84%90%E1%85%A9%E1%86%BC/ico-bicycle-map-pin.svg"
          alt="bicycle-map-pin"
          width={16}
          height={20}
          className="position-centered-x position-centered-y absolute"
        />
      </div>

      {/* 자전거 정보 */}
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="font-bold">{stationName.replace(/^\d+\.\s*/, '')}</div>
          <div className="body4 rounded-full bg-purple-50 px-2 py-[6px] text-purple-500">
            {shared}%
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <IcoBicycle />
            <div className="body4 text-gray-600">
              현재 자전거 수: <span className="text-purple-300">{parkingBikeTotCnt}</span>{' '}
              <span className="text-gray-300">/</span> {rackTotCnt}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <IcoWalking />
            <div className="body4 text-gray-600">
              도보 {walkingTime}분 <span className="text-purple-300">({walkingDistance}m)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
