'use client'

import { useEffect, useState } from 'react'
import dayjs from '@/lib/dayjs'
import IcoRefresh from '@/assets/ico-refresh.svg'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { DdarungiStation } from '@/app/(full-layout)/transit/types/bicycleType'

export default function BicycleContents() {
  const [stations, setStations] = useState<DdarungiStation[]>([])
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
  }, [])

  return (
    <>
      <div className="full-width fixed top-23 z-10 flex min-h-10 items-center justify-end border-b-2 border-gray-50 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="body4 text-gray-800">
            {createdAt ? dayjs(createdAt).format('A h:mm:ss') : ''}
          </div>
          <button onClick={fetchStations} disabled={isLoading}>
            <IcoRefresh />
          </button>
        </div>
      </div>

      <div className="mt-24 flex flex-col gap-4 px-4">
        {isLoading ? (
          <div className="flex-row-center absolute top-0 left-0 h-full w-full">
            <LoadingSpinner />
          </div>
        ) : (
          stations?.map((station) => (
            <div key={station.stationId} className="rounded-xl border bg-white p-4">
              <div className="font-bold">{station.stationName}</div>
              <div>총 거치대: {station.rackTotCnt}</div>
              <div>남은 자전거: {station.parkingBikeTotCnt}</div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
