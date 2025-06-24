'use client'

import SectionHeader from '@/app/(full-layout)/(main)/components/SectionHeader'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { useAuthStore } from '@/stores/login'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getWeeklySchedule } from '@/services/calendar'
import DayScheduleList from '@/app/(full-layout)/calendar/components/DayScheduleList'
import { WeeklyScheduleResponseType } from '@/app/(full-layout)/calendar/types/calendarType'

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일']

// 이번 주 월~일 날짜 배열 반환
function getThisWeekDates() {
  const start = dayjs().startOf('week').add(1, 'day') // 월요일
  return Array.from({ length: 7 }).map((_, i) => start.add(i, 'day').format('YYYY-MM-DD'))
}

export default function WeeklyScheduleSection() {
  const { isLogin } = useAuthStore()
  const { data } = useQuery({
    queryKey: ['weeklySchedule'],
    queryFn: () => getWeeklySchedule(),
  })
  const router = useRouter()

  // 이번 주 날짜 배열
  const weekDates = getThisWeekDates()

  // API 데이터와 매칭
  const days = weekDates.map((date, idx) => {
    const found = (data ?? []).find((d: WeeklyScheduleResponseType) => d.date === date)
    return {
      date,
      label: DAY_LABELS[idx],
      events: found?.events ?? [],
    }
  })

  // 오늘 날짜가 있으면 오늘, 없으면 첫 번째 날짜
  const todayStr = dayjs().format('YYYY-MM-DD')
  const [selectedDate, setSelectedDate] = useState('')
  useEffect(() => {
    if (days.length > 0) {
      const initial = days.find((d) => d.date === todayStr)?.date || days[0].date
      setSelectedDate(initial)
    }
  }, [data])

  const selectedDay = days.find((d) => d.date === selectedDate)

  return (
    <section className="w-full bg-white pb-5">
      <SectionHeader title="주간 일정" onClick={() => router.push('/calendar')} />
      <div className="flex flex-col gap-4 px-[13px]">
        <div className="flex h-15 justify-between">
          {days.map((d) => {
            const isSelected = selectedDate === d.date
            const isToday = todayStr === d.date
            return (
              <div
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={clsx(
                  'flex h-full w-full cursor-pointer flex-col items-center justify-between rounded-[12px] pt-[6px] pb-[10px] text-center',
                  isSelected && 'bg-purple-500',
                )}
              >
                <div
                  className={clsx(
                    'flex-row-center aspect-square w-6',
                    isToday && 'rounded-full bg-purple-500',
                  )}
                >
                  <span
                    className={clsx(
                      'body3 mb-[-1px]',
                      isSelected ? 'text-basic-white' : 'text-basic-black',
                      isToday && 'text-basic-white',
                    )}
                  >
                    {d.label}
                  </span>
                </div>
                {/* 이벤트 여부 점 */}
                {d.events.length > 0 && (
                  <div
                    className={clsx(
                      'h-2 w-2 rounded-full',
                      isSelected ? 'bg-basic-white' : 'bg-purple-500',
                    )}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="flex flex-col gap-3 px-[3px]">
          <span className="body3-sb text-basic-black">
            {selectedDay ? dayjs(selectedDay.date).format('YYYY년 M월 D일') : ''}
          </span>
          {isLogin ? (
            <DayScheduleList scheduleList={selectedDay?.events ?? []} maxLength={2} />
          ) : (
            <div className="flex-row-center h-[55px] w-full rounded-[12px] bg-gray-50 text-center">
              <span className="body4 text-gray-400">로그인 후 확인할 수 있어요</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
