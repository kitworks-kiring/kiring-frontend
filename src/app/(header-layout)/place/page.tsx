import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import PlaceContents from '@/app/(header-layout)/place/components/PlaceContents'

export default function Place() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PlaceContents />
    </Suspense>
  )
}
