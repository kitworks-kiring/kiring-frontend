'use client'

import { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import { useQuery } from '@tanstack/react-query'
import dayjs from '@/lib/dayjs'
import clsx from 'clsx'
import { useAuthStore } from '@/stores/login'
import { getCalendarSchedules } from '@/services/calendar'
import DayScheduleList from '@/app/(full-layout)/calendar/components/DayScheduleList'
import IcoToggle from '@/assets/ico-toggle.svg'
import { sortEvents } from '@/app/(full-layout)/calendar/util/sortEvents'
import { SCHEDULE_TYPE_KO } from '@/app/(full-layout)/calendar/constants'
import { CalendarResponseType } from '@/app/(full-layout)/calendar/types/calendarType'
import './react-calendar.css'

export default function CalendarContents() {
  const [clickedDate, setClickedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [clickedYearMonth, setClickedYearMonth] = useState(dayjs().format('YYYY-MM'))
  const [clickedScheduleList, setClickedScheduleList] = useState<CalendarResponseType>([])
  const [monthlyScheduleList, setMonthlyScheduleList] = useState<CalendarResponseType>([])

  const { isLogin } = useAuthStore()

  const { data: calendarRes } = useQuery<CalendarResponseType>({
    queryKey: ['calendar-schedules', clickedYearMonth],
    queryFn: () =>
      getCalendarSchedules({
        year: dayjs(clickedYearMonth).format('YYYY'),
        month: dayjs(clickedYearMonth).format('MM'),
      }),
    refetchOnWindowFocus: false,
    enabled: isLogin,
  })

  useEffect(() => {
    const kiringEventList: CalendarResponseType = [
      {
        eventId: 9999,
        eventType: 'NOTICE' as const,
        title: '오늘은 키링 첫 오픈 날이에요!',
        start: dayjs('2025-06-27').format('YYYY-MM-DDTHH:mm:ss'),
        end: dayjs('2025-06-27').format('YYYY-MM-DDTHH:mm:ss'),
      },
      {
        eventId: 9998,
        eventType: 'NOTICE' as const,
        title: '오늘은 QA 이벤트 마감일이에요!',
        start: dayjs('2025-07-04').format('YYYY-MM-DDTHH:mm:ss'),
        end: dayjs('2025-07-04').format('YYYY-MM-DDTHH:mm:ss'),
      },
    ]
    const newCalendarRes: CalendarResponseType = calendarRes
      ? [...calendarRes, ...kiringEventList]
      : kiringEventList
    setMonthlyScheduleList(newCalendarRes)
  }, [calendarRes])

  useEffect(() => {
    const list = monthlyScheduleList?.filter((schedule) => {
      return dayjs(schedule.start).format('YYYY-MM-DD') === clickedDate
    })
    const sortedList = sortEvents(list || [])
    setClickedScheduleList(sortedList)
  }, [clickedDate, monthlyScheduleList])

  return (
    <div>
      <section className="p-4">
        <ul className="flex gap-3">
          {SCHEDULE_TYPE_KO.map((scheduleType) => (
            <li
              key={scheduleType.id}
              className={clsx(
                'body4 relative mb-5 text-gray-900 before:mr-1 before:inline-block before:h-2 before:w-2 before:rounded-full',
                scheduleType.color,
              )}
            >
              {scheduleType.name}
            </li>
          ))}
        </ul>
        <Calendar
          locale="ko"
          calendarType="gregory"
          view="month"
          minDetail="month"
          maxDetail="month"
          defaultValue={dayjs().toDate()}
          formatDay={(_, date) => dayjs(date).format('D')}
          prevLabel={
            <div className="flex-row-center rotate-90">
              <IcoToggle />
            </div>
          }
          nextLabel={
            <div className="flex-row-center -rotate-90">
              <IcoToggle />
            </div>
          }
          prev2Label={null}
          next2Label={null}
          onActiveStartDateChange={({ activeStartDate }) => {
            setClickedYearMonth(dayjs(activeStartDate).format('YYYY-MM'))
          }}
          onClickDay={(value) => {
            setClickedDate(dayjs(value).format('YYYY-MM-DD'))
            setClickedYearMonth(dayjs(value).format('YYYY-MM'))
          }}
          tileContent={({ date }) => {
            const isToday = dayjs(date).isSame(dayjs(), 'day')
            const todaySchedulesList = monthlyScheduleList?.filter((schedule) => {
              return dayjs(schedule.start).isSame(dayjs(date), 'day')
            })
            return (
              <>
                {isToday && (
                  <>
                    <div aria-hidden="true" className="today-background" />
                    <span aria-hidden="true" className="today-text">
                      {dayjs(date).date()}
                    </span>
                  </>
                )}
                <div className="flex-row-center absolute bottom-1 h-2 w-full gap-1">
                  {sortEvents(todaySchedulesList || [])
                    ?.slice(0, 3)
                    ?.map(({ eventId, eventType }, idx) => (
                      <div
                        key={`${eventId}-${eventType}-${idx}`}
                        className={clsx(
                          'h-1 w-1 rounded-full',
                          eventType === 'NOTICE' && 'bg-system-purple',
                          eventType === 'BIRTHDAY' && 'bg-system-yellow',
                          eventType === 'STUDY' && 'bg-system-green',
                          eventType === 'DINNER' && 'bg-system-blue',
                          eventType === 'HOLIDAY' && 'bg-system-red',
                        )}
                      />
                    ))}
                </div>
              </>
            )
          }}
        />
      </section>
      <div className="h-3 bg-gray-50" />
      <section className="p-4">
        <p className="body3-sb mb-4">{dayjs(clickedDate).format('YYYY년 M월 D일 dddd')}</p>
        <DayScheduleList scheduleList={clickedScheduleList} />
      </section>
    </div>
  )
}
