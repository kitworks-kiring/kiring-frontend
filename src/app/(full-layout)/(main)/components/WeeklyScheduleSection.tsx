'use client'

import SectionHeader from '@/app/(full-layout)/(main)/components/SectionHeader'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState } from 'react'

interface Event {
  eventId: number | null
  eventType: '생일' | 'STUDY'
  title: string
  start: string
  end: string
  creatorName: string | null
}

interface DayInfo {
  label: string
  value: string
  isEventDay: boolean
  events: Event[]
}

interface EventListProps {
  events: Event[]
}

function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return <div>이벤트가 없어요</div>
  }

  return events.map((event) => <div key={event.eventId || event.title}>{event.title}</div>)
}

export default function WeeklyScheduleSection() {
  const isLogin = true
  const today = dayjs().format('ddd')
  const [selectedDate, setSelectedDate] = useState<string>(today)

  const DAY_OF_WEEK: DayInfo[] = [
    {
      label: '월',
      value: 'Mon',
      isEventDay: true,
      events: [
        {
          eventId: null,
          eventType: '생일',
          title: '김태민2님 생일이에요',
          start: '2025-06-09T00:00:00',
          end: '2025-06-09T23:59:59.999999999',
          creatorName: null,
        },
        {
          eventId: 18,
          eventType: 'STUDY',
          title: '김태민, 백혜인',
          start: '2025-06-18T10:00:00',
          end: '2025-06-18T12:00:00',
          creatorName: '황원준',
        },
      ],
    },
    { label: '화', value: 'Tue', isEventDay: false, events: [] },
    { label: '수', value: 'Wed', isEventDay: false, events: [] },
    { label: '목', value: 'Thu', isEventDay: false, events: [] },
    {
      label: '금',
      value: 'Fri',
      isEventDay: true,
      events: [
        {
          eventId: null,
          eventType: '생일',
          title: '김태민2님 생일이에요',
          start: '2025-06-09T00:00:00',
          end: '2025-06-09T23:59:59.999999999',
          creatorName: null,
        },
        {
          eventId: 18,
          eventType: 'STUDY',
          title: '김태민2님 생일이에요',
          start: '2025-06-18T10:00:00',
          end: '2025-06-18T12:00:00',
          creatorName: '황원준',
        },
      ],
    },
    { label: '토', value: 'Sat', isEventDay: false, events: [] },
    { label: '일', value: 'Sun', isEventDay: false, events: [] },
  ]

  const selectedDayEvents = DAY_OF_WEEK.find((day) => day.value === selectedDate)?.events || []

  return (
    <section className="w-full bg-white pb-5">
      <SectionHeader title="주간 일정" onClick={() => {}} />
      <div className="flex flex-col gap-4 px-[13px]">
        <div className="flex h-15 justify-between">
          {DAY_OF_WEEK.map((day) => {
            const isToday = today === day.value
            const isSelected = selectedDate === day.value

            return (
              <div
                key={day.value}
                onClick={() => setSelectedDate(day.value)}
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
                  {/* 요일 표기 */}
                  <span
                    className={clsx(
                      'body3 mb-[-1px]',
                      isSelected ? 'text-basic-white' : 'text-basic-black',
                      isToday && 'text-basic-white',
                    )}
                  >
                    {day.label}
                  </span>
                </div>
                {/* 이벤트 여부 표기 */}
                {day.isEventDay && (
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
        <div className="flex flex-col gap-3">
          <span className="body3-sb text-basic-black">{dayjs().format('YYYY년 M월 D일')}</span>
          {isLogin ? (
            <div className="flex w-full flex-col gap-2">
              <EventList events={selectedDayEvents} />
            </div>
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
