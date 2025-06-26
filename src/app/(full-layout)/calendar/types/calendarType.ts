export type EventType = 'NOTICE' | 'BIRTHDAY' | 'DINNER' | 'STUDY' | 'HOLIDAY' | 'EMPTY'

export interface CalendarResponseItem {
  eventId: number | null
  eventType: EventType
  title: string
  start: Date | string
  end: Date | string
}

export type CalendarResponseType = CalendarResponseItem[]

export interface WeeklyScheduleResponseType {
  date: string
  events: CalendarResponseItem[]
}
