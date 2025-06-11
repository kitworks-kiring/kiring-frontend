import IntroSection from '@/app/(full-layout)/(main)/components/intro-section'
import RecommendSection from '@/app/(full-layout)/(main)/components/recommend-section/recommend-section'
import WeeklyScheduleSection from '@/app/(full-layout)/(main)/components/weekly-schedule-section'
import MemberSection from '@/app/(full-layout)/(main)/components/member-section'
import Footer from '@/app/(full-layout)/(main)/components/footer'
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
