import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import PlaneContent from '@/app/(no-layout)/plane/components/PlaneContent'

export default function Plane() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PlaneContent />
    </Suspense>
  )
}
