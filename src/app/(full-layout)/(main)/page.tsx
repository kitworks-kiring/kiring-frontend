import IntroSection from '@/app/(full-layout)/(main)/components/introSection/IntroSection'
import RecommendSection from '@/app/(full-layout)/(main)/components/recommendSection/RecommendSection'
import WeeklyScheduleSection from '@/app/(full-layout)/(main)/components/WeeklyScheduleSection'
import MemberSection from '@/app/(full-layout)/(main)/components/memberSection/MemberSection'
import Footer from '@/app/(full-layout)/(main)/components/footer'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function Main() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="mx-auto flex flex-col items-center gap-3 bg-gray-50">
        <IntroSection />
        <RecommendSection />
        <WeeklyScheduleSection />
        <MemberSection />
        <Footer />
      </div>
    </Suspense>
  )
}
