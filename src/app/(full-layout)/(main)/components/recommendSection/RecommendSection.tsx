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

// 스켈레톤 카드 컴포넌트
function PlaceCardSkeleton() {
  return (
    <div className="flex w-[150px] flex-shrink-0 flex-col gap-2">
      <div className="h-[140px] w-full animate-pulse rounded-[12px] bg-gray-200" />
      <div className="flex flex-col gap-1">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  )
}

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
  const { data, isLoading } = useQuery({
    queryKey: ['restaurantList', currentTime.value],
    queryFn: () => getRestaurantNearbyList({ categoryName: currentTime.value, page: 1, size: 7 }),
    enabled: !!currentTime.value,
  })

  return (
    <section className="z-1 mt-[-26px] flex w-full flex-col rounded-t-2xl bg-white pb-6">
      <SectionHeader
        time={currentTime.type}
        title={randomMsg}
        onClick={() => router.push('/place')}
        isLoading={isLoading}
      />
      <div className="scroll-hidden flex gap-4 overflow-x-scroll px-4">
        {isLoading
          ? // 스켈레톤 UI 표시
            Array.from({ length: 7 }).map((_, index) => <PlaceCardSkeleton key={index} />)
          : // 실제 데이터 표시
            data?.content?.map((restaurant) => (
              <PlaceCard key={restaurant.placeId} restaurant={restaurant} />
            ))}
      </div>
    </section>
  )
}
