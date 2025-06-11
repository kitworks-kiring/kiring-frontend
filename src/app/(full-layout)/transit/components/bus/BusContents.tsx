'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { BusResponseType } from '@/app/(full-layout)/transit/types/busType'
import dayjs from 'dayjs'
import IcoRefresh from '@/assets/ico-refresh.svg'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import BusGrid from '@/app/(full-layout)/transit/components/bus/BusGrid'
import { BUS_TYPE_NAME } from '@/app/(full-layout)/transit/constants'

export default function BusContents() {
  const [stations, setStations] = useState<BusResponseType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  async function fetchBusData() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/bus')
      const data = await res.json()
      setStations(data)
    } catch (e) {
      setStations([])
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }
  }

  useEffect(() => {
    fetchBusData()
    const timer = setInterval(fetchBusData, 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    console.log(stations)
  }, [stations])

  return (
    <>
      {/* 버스 정보 헤더 */}
      <div className="full-width fixed top-23 z-10 flex min-h-10 items-center justify-between border-b-2 border-gray-50 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <Image
            src="https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/ico/ico-place-map-pin.svg"
            alt=""
            width={16}
            height={20}
          />
          <span className="body2-sb text-gray-600">회사 근처</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="body4 text-gray-800">{isLoading ? '' : dayjs().format('A h:mm:ss')}</div>
          <button onClick={fetchBusData} disabled={isLoading}>
            <IcoRefresh />
          </button>
        </div>
      </div>

      {/* 버스 정보 컨테이너 */}
      <div className="flex h-full flex-col gap-6 px-4 pt-17">
        <div className="flex items-center gap-3">
          {Object.values(BUS_TYPE_NAME).map(({ name, color }) => (
            <div className="flex items-center gap-1" key={name}>
              <div className={`h-2 w-2 rounded-full ${color}`} />
              <span className="body4 text-gray-900">{name}</span>
            </div>
          ))}
        </div>
        {/* 로딩중 */}
        {isLoading && (
          <div className="flex-row-center absolute top-0 left-0 h-full w-full">
            <LoadingSpinner />
          </div>
        )}
        {/* 버스 정보 없음 */}
        {!stations.length && !isLoading && (
          <div className="body4 flex-row-center absolute top-0 left-0 h-full w-full text-center text-gray-900">
            버스 정보를 불러올 수 없습니다.
          </div>
        )}
        {/* 버스 정보 있음 */}
        {stations.length > 0 && !isLoading && (
          <div>
            {stations.map(({ stationName, buses }) => {
              return (
                <BusGrid
                  key={stationName}
                  stationName={stationName}
                  showAll={showAll}
                  buses={buses}
                  setShowAll={setShowAll}
                />
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
