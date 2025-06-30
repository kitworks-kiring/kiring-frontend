import { redirect } from 'next/navigation'
import { getMemberById } from '@/services/member'
import ProfileSection from '@/app/(header-layout)/profile/components/profile/ProfileSection'
import MemberInfoSection from '@/app/(header-layout)/profile/components/memberinfo/MemberInfoSection'

interface Props {
  memberId: string
}

export default async function MembersContent({ memberId }: Props) {
  const id = Number(memberId)

  if (!id || isNaN(id)) {
    redirect('/error')
  }

  let data
  try {
    data = await getMemberById(id)
  } catch (error) {
    console.error('[MembersContent] Failed to fetch member:', error)
    return redirect('/error')
  }

  if (!data) {
    return redirect('/error')
  }

  return (
    <div className="flex flex-col gap-6">
      <ProfileSection user={data.member} />
      <MemberInfoSection user={data.member} />
    </div>
  )
}
