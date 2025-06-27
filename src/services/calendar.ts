import ApiClient from '@/lib/api/client'
import {
  CalendarResponseType,
  WeeklyScheduleResponseType,
} from '@/app/(full-layout)/calendar/types/calendarType'

export const getCalendarSchedules = ({
  year,
  month,
}: {
  year: string
  month: string
}): Promise<CalendarResponseType> => {
  return ApiClient.get(`/event/monthly?year=${year}&month=${month}`)
}

export const getWeeklySchedule = (): Promise<WeeklyScheduleResponseType[]> => {
  return ApiClient.get(`/event/weekly`)
}
