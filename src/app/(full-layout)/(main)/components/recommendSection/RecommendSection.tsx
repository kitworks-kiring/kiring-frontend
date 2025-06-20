'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import SectionHeader from '@/app/(full-layout)/(main)/components/SectionHeader'
import PlaceCard from '@/app/(full-layout)/(main)/components/recommendSection/PlaceCard'
import { useRouter } from 'next/navigation'
import { TIME_BLOCKS } from '@/app/(full-layout)/(main)/constants'
import { useQuery } from '@tanstack/react-query'
import { getRestaurantNearbyList } from '@/services/restaurant'
import { TimeBlockType } from '@/app/(full-layout)/(main)/types/timeBlock'

export default function RecommendSection() {
  const router = useRouter()
  // 기본값(SSR)
  const [currentTime, setCurrentTime] = useState<TimeBlockType>(TIME_BLOCKS[0])
  const [randomMsg, setRandomMsg] = useState('')

  useEffect(() => {
    const now = dayjs()
    const hour = now.hour()
    // 현재 시간에 맞는 블록 찾기
    const currentBlock =
      TIME_BLOCKS.find(
        (block) =>
          (block.start <= hour && hour < block.end) ||
          (block.start > block.end && (hour >= block.start || hour < block.end)),
      ) || TIME_BLOCKS[0]
    setCurrentTime(currentBlock)
    setRandomMsg(currentBlock.messages[Math.floor(Math.random() * currentBlock.messages.length)])
  }, [])

  // 시간별 맛집 조회
  const { data } = useQuery({
    queryKey: ['recommend-place'],
    queryFn: () => getRestaurantNearbyList({ categoryName: currentTime.value, page: 1, size: 7 }),
    enabled: !!currentTime.value,
  })

  console.log(data, currentTime)

  return (
    <section className="z-1 mt-[-26px] flex w-full flex-col rounded-t-2xl bg-white pb-6">
      <SectionHeader
        time={currentTime.type}
        title={randomMsg}
        onClick={() => router.push('/place')}
      />
      <div className="scroll-hidden flex gap-4 overflow-x-scroll px-4">
        {data?.content?.map((restaurant) => (
          <PlaceCard key={restaurant.placeId} restaurant={restaurant} />
        ))}
      </div>
    </section>
  )
}
