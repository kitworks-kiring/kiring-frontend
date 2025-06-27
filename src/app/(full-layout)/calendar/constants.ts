import dayjs from '@/lib/dayjs'
import { EventType, CalendarResponseType } from '@/app/(full-layout)/calendar/types/calendarType'

export const SCHEDULE_TYPE_KO = [
  { id: 1, name: '공지', color: 'before:bg-system-purple' },
  { id: 2, name: '생일', color: 'before:bg-system-yellow' },
  { id: 3, name: '회식', color: 'before:bg-system-blue' },
  { id: 4, name: '스터디', color: 'before:bg-system-green' },
  { id: 5, name: '휴일', color: 'before:bg-system-red' },
] as const

export const EVENT_TYPE_PRIORITY: Record<EventType, number> = {
  NOTICE: 1,
  BIRTHDAY: 2,
  DINNER: 3,
  STUDY: 4,
  HOLIDAY: 5,
  EMPTY: 6,
} as const

export const KIRING_EVENT_LIST: CalendarResponseType = [
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
