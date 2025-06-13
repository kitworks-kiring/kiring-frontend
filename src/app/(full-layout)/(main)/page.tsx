import IntroSection from '@/app/(full-layout)/(main)/components/introSection/IntroSection'
import RecommendSection from '@/app/(full-layout)/(main)/components/recommendSection/RecommendSection'
import WeeklyScheduleSection from '@/app/(full-layout)/(main)/components/WeeklyScheduleSection'
import MemberSection from '@/app/(full-layout)/(main)/components/memberSection/MemberSection'
import Footer from '@/app/(full-layout)/(main)/components/Footer'
export default function Main() {
  return (
    <div className="mx-auto flex flex-col items-center gap-3 bg-gray-50">
      <IntroSection />
      <RecommendSection />
      <WeeklyScheduleSection />
      <MemberSection />
      <Footer />
    </div>
  )
}
