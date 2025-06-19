import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import MypageContent from '@/app/(header-layout)/profile/components/MypageContent'

export default function Place() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MypageContent />
    </Suspense>
  )
}
