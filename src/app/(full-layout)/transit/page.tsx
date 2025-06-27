import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import TransitContents from '@/app/(full-layout)/transit/components/TransitContents'

export default function Transit() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TransitContents />
    </Suspense>
  )
}
