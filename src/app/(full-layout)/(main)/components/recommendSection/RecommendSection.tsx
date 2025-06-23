'use client'

import SectionHeader from '@/app/(full-layout)/(main)/components/SectionHeader'
import PlaceCard from '@/app/(full-layout)/(main)/components/recommendSection/PlaceCard'
import { useRouter } from 'next/navigation'

export default function RecommendSection() {
  const router = useRouter()
  return (
    <section className="z-1 mt-[-26px] flex w-full flex-col rounded-t-2xl bg-white pb-6">
      <SectionHeader
        time="Lunch"
        title="오늘 점심은 여기 어때요?"
        onClick={() => router.push('/place')}
      />
      <div className="scroll-hidden flex gap-4 overflow-x-scroll px-4">
        {[1, 1, 1, 1, 1, 1, 1].map((_, index) => (
          <PlaceCard key={index} index={index} />
        ))}
      </div>
    </section>
  )
}
