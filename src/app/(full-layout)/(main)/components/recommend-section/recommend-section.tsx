'use client'

import SectionHeader from '@/app/(full-layout)/(main)/components/section-header'
import PlaceCard from '@/app/(full-layout)/(main)/components/recommend-section/place-card'

export default function RecommendSection() {
  return (
    <section className="flex w-full flex-col bg-white pb-6">
      <SectionHeader
        time="Lunch"
        title="오늘 점심은 여기 어때요?"
        onClick={() => console.log('click')}
      />
      <div className="flex gap-4 overflow-x-scroll px-4 [&::-webkit-scrollbar]:hidden">
        {[1, 1, 1, 1, 1, 1, 1].map((_, index) => (
          <PlaceCard key={index} index={index} />
        ))}
      </div>
    </section>
  )
}
