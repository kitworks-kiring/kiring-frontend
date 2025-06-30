import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import MembersContent from '@/app/(header-layout)/profile/components/MembersContent'

type PageParams = Promise<{ memberId: string }>
export default async function MemberProfilePage({ params }: { params: PageParams }) {
  const { memberId } = await params

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MembersContent memberId={memberId} />
    </Suspense>
  )
}
