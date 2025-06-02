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

export default function SubwayContents() {
  const initialActiveTab = 'all'

  const [subwayData, setSubwayData] = useState<SubwayDataType | null>(null)
  const { selected, onSelect } = useSingleSelect(initialActiveTab)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSubway()
      setSubwayData(data)
    }
    fetchData()
  }, [])

  const { groupedNum2 = {}, groupedNum9 = {}, receptnDt } = subwayData || {}

  return (
    <>
      <BubbleTab
        bubbles={SUBWAY_BUBBLES}
        active={selected}
        onChange={onSelect}
        propsClass="body4"
      />
      {subwayData ? (
        <>
          <div className="flex items-center justify-between border-b-2 border-gray-50 px-4 py-3">
            <div className="body2-sb flex items-center gap-2 text-gray-600">
              <IcoPin />
              당산역
            </div>
            <div className="body4 text-gray-600">{dayjs(receptnDt).format('A h:mm:ss')}</div>
          </div>
          <section className="mt-7 flex flex-col gap-10 px-4">
            {/* 2호선 */}
            {selected !== '9' && (
              <div className="flex flex-col gap-3">
                <GroupHeader number={2} />
                <RealtimeHeader />
                <DirectionGrid grouped={groupedNum2} />
              </div>
            )}
            {/* 9호선 */}
            {selected !== '2' && (
              <div className="flex flex-col gap-3">
                <GroupHeader number={9} />
                <RealtimeHeader />
                <DirectionGrid grouped={groupedNum9} />
              </div>
            )}
          </section>
        </>
      ) : (
        <div>데이터를 불러올 수 없습니다.</div>
      )}
    </>
  )
}
