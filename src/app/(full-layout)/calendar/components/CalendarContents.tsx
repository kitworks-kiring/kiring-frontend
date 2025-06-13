'use client'

import { useState, useEffect } from 'react'
import { Calendar } from 'react-calendar'
import { useQuery } from '@tanstack/react-query'
import dayjs from '@/lib/dayjs'
import clsx from 'clsx'
import { getCalendarSchedules } from '@/services/calendar'
import IcoToggle from '@/assets/ico-toggle.svg'
import DayScheduleList from '@/app/(full-layout)/calendar/components/DayScheduleList'
import { CalendarResponseType } from '@/app/(full-layout)/calendar/types/calendarType'
import { SCHEDULE_TYPE_KO } from '@/app/(full-layout)/calendar/constants'
import './react-calendar.css'

export default function CalendarContents() {
  const [clickedDate, setClickedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [clickedYearMonth, setClickedYearMonth] = useState(dayjs().format('YYYY-MM'))
  const [clickedScheduleList, setClickedScheduleList] = useState<CalendarResponseType>([])

  // TODO: isLogin 전역 상태 설정되면 값 가져와서 사용
  const tempIsLogin = true
  const { data: monthlyScheduleList } = useQuery({
    queryKey: ['calendar-schedules', clickedYearMonth],
    queryFn: () =>
      getCalendarSchedules({
        year: dayjs(clickedYearMonth).format('YYYY'),
        month: dayjs(clickedYearMonth).format('MM'),
      }),
    refetchOnWindowFocus: false,
    enabled: tempIsLogin,
  })

  useEffect(() => {
    const list = monthlyScheduleList?.filter((schedule) => {
      return dayjs(schedule.start).format('YYYY-MM-DD') === clickedDate
    })
    setClickedScheduleList(list ?? [])
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
                  {todaySchedulesList
                    ?.slice(0, 3)
                    ?.map(({ eventId, eventType }, idx) => (
                      <div
                        key={`${eventId}-${eventType}-${idx}`}
                        className={clsx(
                          'h-1 w-1 rounded-full',
                          eventType === 'BIRTHDAY' && 'bg-system-yellow',
                          eventType === 'STUDY' && 'bg-system-green',
                          eventType === 'DINNER' && 'bg-system-blue',
                          eventType === 'HOLIDAY' && 'bg-system-red',
                          eventType === 'NOTICE' && 'bg-system-purple',
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
