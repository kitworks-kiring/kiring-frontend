'use client'
import { useEffect, useState } from 'react'
import { DdarungiStation } from '@/app/(full-layout)/transit/types/bicycleType'
import dayjs from '@/lib/dayjs'

export default function BicycleContents() {
  const [stations, setStations] = useState<DdarungiStation[]>([])
  const [loading, setLoading] = useState(true)
  const [createdAt, setCreatedAt] = useState(0)
  async function fetchStations() {
    try {
      const res = await fetch('/api/bicycle')
      const { stations, createdAt } = await res.json()
      setStations(stations ?? [])
      setCreatedAt(createdAt)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchStations()
  }, [])

  if (loading) return <div>로딩중...</div>
  return (
    <>
      <div className="flex items-center justify-end border-b-2 border-gray-50 px-4 py-3">
        <div className="body4 text-gray-600">{dayjs(createdAt).format('A h:mm:ss')}</div>
      </div>
      <div className="mt-7 grid gap-4 px-4">
        {stations?.map((station) => (
          <div key={station.stationId} className="rounded-xl border bg-white p-4">
            <div className="font-bold">{station.stationName}</div>
            <div>총 거치대: {station.rackTotCnt}</div>
            <div>
              남은 자전거:{' '}
              <span className="font-bold text-green-600">{station.parkingBikeTotCnt}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
