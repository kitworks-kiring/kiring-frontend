import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import PlaceContent from '@/app/(header-layout)/place/components/PlaceContent'

export default function Place() {
  return (
    <section className="h-full">
      <Suspense fallback={<LoadingSpinner />}>
        <PlaceContent />
      </Suspense>
    </section>
  )
}
