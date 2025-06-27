import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Suspense } from 'react'
import CommunityContents from '@/app/(full-layout)/community/components/CommunityContents'

export default function Community() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CommunityContents />
    </Suspense>
  )
}
