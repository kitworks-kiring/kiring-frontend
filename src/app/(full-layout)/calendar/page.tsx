import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import CalendarContents from '@/app/(full-layout)/calendar/components/CalendarContents'

export default function Calendar() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CalendarContents />
    </Suspense>
  )
}
