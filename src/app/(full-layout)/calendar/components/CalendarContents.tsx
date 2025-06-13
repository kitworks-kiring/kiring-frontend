'use client'

import { useState, useEffect } from 'react'
import { Calendar } from 'react-calendar'
import dayjs from '@/lib/dayjs'
import clsx from 'clsx'
import IcoBirthday from '@/assets/ico-birthday.svg'
import IcoStudy from '@/assets/ico-study.svg'
import IcoDinner from '@/assets/ico-dinner.svg'
import IcoHoliday from '@/assets/ico-holiday.svg'
import IcoNotice from '@/assets/ico-notice.svg'
import IcoEmpty from '@/assets/ico-empty.svg'
import IcoToggle from '@/assets/ico-toggle.svg'
import { SCHEDULE_TYPE_KO, TMP_CALENDAR_SCHEDULES } from '../mock/calendar'
import './react-calendar.css'

export default function CalendarContents() {
  const [clickedDate, setClickedDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [todayScheduleList, setTodayScheduleList] = useState<typeof TMP_CALENDAR_SCHEDULES>([])

  useEffect(() => {
    const list = TMP_CALENDAR_SCHEDULES.reduce<typeof TMP_CALENDAR_SCHEDULES>((acc, schedule) => {
      if (dayjs(schedule.date).isSame(dayjs(clickedDate), 'day')) acc.push(schedule)
      return acc
    }, [])
    setTodayScheduleList(list)
  }, [clickedDate])

  const renderElementByType = ({ type, title }: { type: string; title: string }) => {
    const getStudyText = (title: string) => {
      const [beName, feName] = title.split(',')
      const beText = beName ? `백엔드팀 ${beName}님, ` : ''
      const feText = feName ? `프론트팀 ${feName}님` : ''
      return `${beText}${feText} 팀스터디에요`
    }

    const typeMap: Record<string, { icon: React.JSX.Element; title: string; desc: string }> = {
      birthday: {
        icon: <IcoBirthday />,
        title: `${title}님 생일이에요`,
        desc: '따뜻한 축하 한마디 남겨주세요',
      },
      study: {
        icon: <IcoStudy />,
        title: getStudyText(title),
        desc: '지식을 나누면 팀도 함께 성장해요',
      },
      dinner: {
        icon: <IcoDinner />,
        title: `${title}팀 회식이에요`,
        desc: '이번 주도 수고 했어요, 시원하게 짠!',
      },
      holiday: {
        icon: <IcoHoliday />,
        title: `${title}일은 휴일이에요`,
        desc: '충전 가득한 하루 보내세요',
      },
      notice: {
        icon: <IcoNotice />,
        title: title,
        desc: '놓치지 말고 꼭 확인해주세요!',
      },
      empty: {
        icon: <IcoEmpty />,
        title: '오늘은 등록된 일정이 없어요',
        desc: '비워진 하루, 여유롭게 채워보세요',
      },
    }

    const { icon, title: itemTitle, desc } = typeMap[type] || typeMap.empty

    return (
      <li key={type} className="flex items-center gap-3">
        {icon}
        <p className="flex flex-col justify-center gap-1.5">
          <span className="body4-sb text-gray-800">{itemTitle}</span>
          <span className="body5 text-purple-500">{desc}</span>
        </p>
      </li>
    )
  }

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
          defaultValue={dayjs().toDate()}
          formatDay={(_, date) => dayjs(date).format('D')}
          onViewChange={() => console.log('onClickMonth')}
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
          }}
          tileContent={({ date }) => {
            const isToday = dayjs(date).isSame(dayjs(), 'day')
            const todayScheduleList = TMP_CALENDAR_SCHEDULES.reduce<typeof TMP_CALENDAR_SCHEDULES>(
              (acc, schedule) => {
                if (dayjs(schedule.date).isSame(dayjs(date), 'day')) {
                  acc.push(schedule)
                }
                return acc
              },
              [],
            )
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
                  {todayScheduleList.length > 0 &&
                    todayScheduleList
                      .slice(0, 3)
                      ?.map((schedule) => (
                        <div
                          key={schedule.id}
                          className={clsx(
                            'h-1 w-1 rounded-full',
                            schedule.event_category === 'birthday' && 'bg-system-yellow',
                            schedule.event_category === 'study' && 'bg-system-green',
                            schedule.event_category === 'dinner' && 'bg-system-blue',
                            schedule.event_category === 'holiday' && 'bg-system-red',
                            schedule.event_category === 'notice' && 'bg-system-purple',
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
        <p className="body3-sb mb-4">{clickedDate}</p>
        <ul className="flex min-h-45 flex-col gap-4">
          {!todayScheduleList?.length
            ? renderElementByType({ type: 'empty', title: '' })
            : todayScheduleList.map((schedule) =>
                renderElementByType({
                  type: schedule.event_category,
                  title: schedule.title,
                }),
              )}
        </ul>
      </section>
    </div>
  )
}
