'use client'

import { useEffect, useState } from 'react'
import dayjs from '@/lib/dayjs'
import IcoPin from '@/assets/ico-pin.svg'
import BubbleTab from '@/components/tabs/BubbleTab'
import { useSingleSelect } from '@/components/tabs/BubbleTab/useSingleSelect'
import { SUBWAY_BUBBLES } from '@/app/(full-layout)/transit/constants'
import DirectionGrid from '@/app/(full-layout)/transit/components/subway/DirectionGrid'
import GroupHeader from '@/app/(full-layout)/transit/components/subway/GroupHeader'
import RealtimeHeader from '@/app/(full-layout)/transit/components/subway/RealtimeHeader'
import fetchSubway from '@/app/(full-layout)/transit/fetchSubway'
import { SubwayDataType } from '@/app/(full-layout)/transit/types/subwayType'
import IcoRefresh from '@/assets/ico-refresh.svg'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function SubwayContents() {
  const initialActiveTab = 'all'
  const [isLive2, setIsLive2] = useState(true)
  const [isLive9, setIsLive9] = useState(true)
  const [subwayData, setSubwayData] = useState<SubwayDataType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { selected, onSelect } = useSingleSelect(initialActiveTab)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await fetchSubway()
      setSubwayData(data)
    } catch (error) {
      console.error('지하철 정보를 가져오는데 실패했습니다:', error)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const { groupedNum2 = {}, groupedNum9 = {}, receptnDt } = subwayData || {}

  return (
    <>
      <div className="full-width fixed top-23 z-10 bg-white">
        <BubbleTab
          bubbles={SUBWAY_BUBBLES}
          active={selected}
          onChange={onSelect}
          propsClass="body4"
        />

        <div className="flex items-center justify-between border-b-2 border-gray-50 px-4 py-3">
          <div className="body2-sb flex items-center gap-2 text-gray-600">
            <IcoPin />
            당산역
          </div>
          <div className="flex items-center gap-2">
            {subwayData && (
              <div className="body4 text-gray-800">{dayjs(receptnDt).format('A h:mm:ss')}</div>
            )}
            <button onClick={fetchData} disabled={isLoading}>
              <IcoRefresh />
            </button>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="mt-40 flex h-[50vh] items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      {!subwayData ||
        (Object.keys(subwayData).length === 0 && (
          <div className="mt-40 flex h-[50vh] items-center justify-center text-gray-600">
            데이터를 불러올 수 없습니다.
          </div>
        ))}
      {subwayData && !isLoading && (
        <section className="mt-40 flex flex-col gap-10 px-4">
          {/* 2호선 */}
          {selected !== '9' && (
            <div className="flex flex-col gap-3">
              <GroupHeader number={2} />
              <RealtimeHeader isLive={isLive2} onToggle={setIsLive2} />
              <DirectionGrid grouped={groupedNum2} />
            </div>
          )}
          {/* 9호선 */}
          {selected !== '2' && (
            <div className="flex flex-col gap-3">
              <GroupHeader number={9} />
              <RealtimeHeader isLive={isLive9} onToggle={setIsLive9} />
              <DirectionGrid grouped={groupedNum9} />
            </div>
          )}
        </section>
      )}
    </>
  )
}
