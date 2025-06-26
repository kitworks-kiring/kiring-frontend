import { EVENT_TYPE_PRIORITY } from '@/app/(full-layout)/calendar/constants'
import { CalendarResponseType, EventType } from '@/app/(full-layout)/calendar/types/calendarType'

const getEventPriority = (eventType: EventType): number => {
  return EVENT_TYPE_PRIORITY[eventType as EventType] ?? EVENT_TYPE_PRIORITY['EMPTY']
}

export const sortEvents = (eventList: CalendarResponseType): CalendarResponseType => {
  if (!eventList || !eventList.length) return eventList

  return [...eventList].sort((a, b) => {
    return getEventPriority(a.eventType) - getEventPriority(b.eventType)
  })
}
