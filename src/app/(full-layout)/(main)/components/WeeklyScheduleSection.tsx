'use client'

import SectionHeader from '@/app/(full-layout)/(main)/components/SectionHeader'

export default function WeeklyScheduleSection() {
  const isLogin = true
  return (
    <section className="w-full bg-white pb-5">
      <SectionHeader title="주간 일정" onClick={() => {}} />
      <div className="flex flex-col gap-4 px-[13px]">
        <div className="flex h-15 justify-between bg-purple-50">
          {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
            <div key={day} className="w-15 text-center">
              <span>{day}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="body3-sb text-basic-black">2025년 4월 44일</span>
          {isLogin ? (
            <div className="flex h-[55px] w-full items-center justify-center rounded-[12px] bg-gray-50 text-center">
              <span className="body4 text-gray-400">로그인</span>
            </div>
          ) : (
            <div className="flex h-[55px] w-full items-center justify-center rounded-[12px] bg-gray-50 text-center">
              <span className="body4 text-gray-400">로그인 후 확인할 수 있어요</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
