import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import MembersContent from '@/app/(header-layout)/profile/components/MembersContent'

export default function MemberProfilePage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MembersContent />
    </Suspense>
  )
}
