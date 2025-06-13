import dayjs from '@/lib/dayjs'
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
  // TODO: isLogin 전역 상태 설정되면 값 가져와서 사용
  const tempIsLogin = true

  const renderSchedule = (schedule?: CalendarResponseItem) => {
    const type = schedule?.eventType || 'EMPTY'
    const title = schedule?.title || ''
    const day = dayjs(schedule?.start).format('D')

    const getStudyText = (title: string) => {
      const [beName, feName] = title.split(',') ?? ','
      const beText = beName ? `백엔드팀 ${beName}님, ` : ''
      const feText = feName ? `프론트팀 ${feName}님` : ''
      return `${beText}${feText} 팀스터디에요`
    }

    const typeMap: Record<string, { icon: React.JSX.Element; title: string; desc: string }> = {
      BIRTHDAY: {
        icon: <IcoBirthday />,
        title: `${title}님 생일이에요`,
        desc: '따뜻한 축하 한마디 남겨주세요',
      },
      STUDY: {
        icon: <IcoStudy />,
        title: getStudyText(title),
        desc: '지식을 나누면 팀도 함께 성장해요',
      },
      DINNER: {
        icon: <IcoDinner />,
        title: `${title}팀 회식이에요`,
        desc: '이번 주도 수고 했어요, 시원하게 짠!',
      },
      HOLIDAY: {
        icon: <IcoHoliday />,
        title: `${day}일은 휴일이에요`,
        desc: '충전 가득한 하루 보내세요',
      },
      NOTICE: {
        icon: <IcoNotice />,
        title: title,
        desc: '놓치지 말고 꼭 확인해주세요!',
      },
      EMPTY: {
        icon: <IcoEmpty />,
        title: '오늘은 등록된 일정이 없어요',
        desc: '비워진 하루, 여유롭게 채워보세요',
      },
    }

    const { icon, title: itemTitle, desc } = typeMap[type]

    return (
      <li key={`${schedule?.eventId}-${type}`} className="flex items-center gap-3">
        {icon}
        <p className="flex flex-col justify-center gap-1.5">
          <span className="body4-sb text-gray-800">{itemTitle}</span>
          <span className="body5 text-purple-500">{desc}</span>
        </p>
      </li>
    )
  }

  return (
    <>
      {/* 로그인 N */}
      {!tempIsLogin && (
        <p className="body4 flex-row-center h-17 w-full rounded-2xl bg-gray-50 text-gray-400">
          로그인 후 확인할 수 있어요
        </p>
      )}
      {tempIsLogin && !scheduleList?.length ? (
        // 로그인 Y + 스케줄 N
        <ul className="flex flex-col gap-4">{renderSchedule()}</ul>
      ) : (
        // 로그인 Y + 스케줄 Y
        <ul className="flex flex-col gap-4">
          {scheduleList
            ?.slice(0, maxLength ?? scheduleList.length)
            ?.map((schedule) => renderSchedule(schedule))}
        </ul>
      )}
    </>
  )
}
