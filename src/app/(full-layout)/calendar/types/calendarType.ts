export interface CalendarResponseItem {
  eventId: number | null
  eventType: string
  title: string
  start: Date
  end: Date
  creatorName: string | null
}

export type CalendarResponseType = CalendarResponseItem[]

export interface WeeklyScheduleResponseType {
  date: string
  events: CalendarResponseItem[]
}
