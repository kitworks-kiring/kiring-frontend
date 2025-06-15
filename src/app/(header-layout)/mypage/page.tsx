import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import MypageContent from '@/app/(header-layout)/mypage/components/MypageContent'

export default function Place() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MypageContent />
    </Suspense>
  )
}
