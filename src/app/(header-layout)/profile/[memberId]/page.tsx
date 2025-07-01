import { redirect } from 'next/navigation'
import { getMemberById } from '@/services/member'
import ProfileSection from '@/app/(header-layout)/profile/components/profile/ProfileSection'
import MemberInfoSection from '@/app/(header-layout)/profile/components/memberinfo/MemberInfoSection'

type PageParams = Promise<{ memberId: string }>

export default async function MemberProfilePage({ params }: { params: PageParams }) {
  const { memberId } = await params
  const id = Number(memberId)

  if (isNaN(id)) {
    redirect('/error')
  }

  try {
    const data = await getMemberById(id)

    if (!data?.member) {
      redirect('/error')
    }

    return (
      <div className="flex flex-col gap-6">
        <ProfileSection user={data.member} />
        <MemberInfoSection user={data.member} />
      </div>
    )
  } catch {
    redirect('/error')
  }
}
