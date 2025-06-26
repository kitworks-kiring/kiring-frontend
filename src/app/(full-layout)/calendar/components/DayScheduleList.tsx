'use client'

import dayjs from '@/lib/dayjs'
import { useAuthStore } from '@/stores/login'
import IcoBirthday from '@/assets/ico-birthday.svg'
import IcoStudy from '@/assets/ico-study.svg'
import IcoDinner from '@/assets/ico-dinner.svg'
import IcoHoliday from '@/assets/ico-holiday.svg'
import IcoNotice from '@/assets/ico-notice.svg'
import IcoEmpty from '@/assets/ico-empty.svg'
import {
  CalendarResponseItem,
  CalendarResponseType,
} from '@/app/(full-layout)/calendar/types/calendarType'

export default function DayScheduleList({
  scheduleList,
  maxLength,
}: {
  scheduleList: CalendarResponseType
  maxLength?: number
}) {
  const { isLogin } = useAuthStore()

  const renderSchedule = (schedule?: CalendarResponseItem, index?: number) => {
    const type = schedule?.eventType || 'EMPTY'
    const title = schedule?.title || ''
    const day = dayjs(schedule?.start).format('D')

    const getStudyText = (title: string) => {
      const [first, second] = title.trim().split(',') ?? ''
      return `${first ? first + '님' : ''}${second ? ', ' + second + '님' : ''} 팀스터디에요`
    }

    const typeMap: Record<string, { icon: React.JSX.Element; title: string; desc: string }> = {
      NOTICE: {
        icon: <IcoNotice />,
        title: title,
        desc: '놓치지 말고 꼭 확인해주세요!',
      },
      BIRTHDAY: {
        icon: <IcoBirthday />,
        title: `${title}님 생일이에요`,
        desc: '따뜻한 축하 한마디 남겨주세요',
      },
      DINNER: {
        icon: <IcoDinner />,
        title: `${title} 회식이에요`,
        desc: '이번 주도 수고 했어요, 시원하게 짠!',
      },
      STUDY: {
        icon: <IcoStudy />,
        title: getStudyText(title),
        desc: '지식을 나누면 팀도 함께 성장해요',
      },
      HOLIDAY: {
        icon: <IcoHoliday />,
        title: `${day}일은 휴일이에요`,
        desc: '충전 가득한 하루 보내세요',
      },
      EMPTY: {
        icon: <IcoEmpty />,
        title: '오늘은 등록된 일정이 없어요',
        desc: '비워진 하루, 여유롭게 채워보세요',
      },
    }

    const { icon, title: itemTitle, desc } = typeMap[type]

    return (
      <li key={`${type}-${schedule?.eventId}-${index}`} className="flex items-center gap-3">
        {icon}

        <p className="flex flex-col justify-center gap-1.5">
          <span className="body4-sb text-gray-800">{itemTitle}</span>
          {[9998, 9999].includes(schedule?.eventId ?? -1) ? (
            <span className="body5 text-purple-500">
              {schedule?.eventId === 9999
                ? '회사생활이 조금 더 특별해질 거예요 🎉'
                : '제출하고 🎁 이벤트 상품 꼭 받아가세요!'}
            </span>
          ) : (
            <span className="body5 text-purple-500">{desc}</span>
          )}
        </p>
      </li>
    )
  }

  return (
    <>
      {/* 로그인 N */}
      {!isLogin && (
        <p className="body4 flex-row-center h-17 w-full rounded-2xl bg-gray-50 text-gray-400">
          로그인 후 확인할 수 있어요
        </p>
      )}
      {isLogin && !scheduleList?.length ? (
        // 로그인 Y + 스케줄 N
        <ul className="flex flex-col gap-4">{renderSchedule()}</ul>
      ) : (
        // 로그인 Y + 스케줄 Y
        <ul className="flex flex-col gap-4">
          {scheduleList
            ?.slice(0, maxLength ?? scheduleList.length)
            ?.map((schedule, index) => renderSchedule(schedule, index))}
        </ul>
      )}
    </>
  )
}
