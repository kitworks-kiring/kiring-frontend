'use client'

import { useEffect, useState } from 'react'
import dayjs from '@/lib/dayjs'
import IcoRefresh from '@/assets/ico-refresh.svg'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { BicycleStationType } from '@/app/(full-layout)/transit/types/bicycleType'
import BicycleGrid from '@/app/(full-layout)/transit/components/bicycle/BicycleGrid'
import IcoBicycleLogo from '@/assets/ico-bicycle-logo.svg'

export default function BicycleContents() {
  const [stations, setStations] = useState<BicycleStationType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [createdAt, setCreatedAt] = useState(0)
  async function fetchStations() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/bicycle')
      const { stations, createdAt } = await res.json()
      setStations(stations ?? [])
      setCreatedAt(createdAt)
    } catch (error) {
      console.error(error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }
  }

  useEffect(() => {
    fetchStations()
    const timer = setInterval(fetchStations, 60 * 1000) // 1분마다 새로고침
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <div className="full-width fixed top-23 z-10 flex min-h-10 items-center justify-between border-b-2 border-gray-50 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <IcoBicycleLogo />
          <span className="body2-sb text-gray-600">회사 근처</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="body4 text-gray-800">
            {createdAt ? dayjs(createdAt).format('A h:mm:ss') : ''}
          </div>
          <button onClick={fetchStations} disabled={isLoading}>
            <IcoRefresh />
          </button>
        </div>
      </div>

      <div className="mt-21 flex flex-col">
        {isLoading ? (
          <div className="flex-row-center absolute top-0 left-0 h-full w-full">
            <LoadingSpinner />
          </div>
        ) : (
          stations?.map((station: BicycleStationType, index: number) => (
            <BicycleGrid
              key={station.stationId}
              index={index}
              stationName={station.stationName}
              shared={station.shared}
              parkingBikeTotCnt={station.parkingBikeTotCnt}
              rackTotCnt={station.rackTotCnt}
              stationLatitude={station.stationLatitude}
              stationLongitude={station.stationLongitude}
            />
          ))
        )}
      </div>
    </>
  )
}
