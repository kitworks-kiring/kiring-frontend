import { redirect } from 'next/navigation'
import { getMemberById } from '@/services/member'
import ProfileSection from '@/app/(header-layout)/profile/components/profile/ProfileSection'
import MemberInfoSection from '@/app/(header-layout)/profile/components/memberinfo/MemberInfoSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Suspense } from 'react'

type PageParams = Promise<{ memberId: string }>

export default async function MemberProfilePage({ params }: { params: PageParams }) {
  const { memberId } = await params
  const id = Number(memberId)

  if (!id || isNaN(id)) {
    redirect('/error')
  }

  let data
  try {
    data = await getMemberById(id)
  } catch (error) {
    console.error('[MembersProfile] Failed to fetch member:', error)
    return redirect('/error')
  }

  if (!data) {
    return redirect('/error')
  }

  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<LoadingSpinner />}>
        <ProfileSection user={data.member} />
        <MemberInfoSection user={data.member} />
      </Suspense>
    </div>
  )
}
