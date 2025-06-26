'use client'

import { useQuery } from '@tanstack/react-query'
import { getMemberById } from '@/services/member'
import { useParams, useRouter } from 'next/navigation'
import ProfileSection from '@/app/(header-layout)/profile/components/profile/ProfileSection'
import MemberInfoSection from '@/app/(header-layout)/profile/components/memberinfo/MemberInfoSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function MemberPage() {
  const { memberId } = useParams()
  const router = useRouter()
  const memberIdParam = Array.isArray(memberId) ? memberId[0] : memberId
  const id = memberIdParam ? Number(memberIdParam) : 0

  const { data, isLoading, isError } = useQuery({
    queryKey: ['member', id],
    queryFn: () => getMemberById(id),
    enabled: !!id,
  })

  // ✅ 잘못된 ID or 서버에서 데이터 없음
  if (!id || isNaN(id) || id <= 0) {
    router.push('/error')
  }

  if (!isLoading && (isError || !data)) {
    router.push('/error')
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {data && (
        <div className="flex flex-col gap-6">
          <ProfileSection user={data.member} />
          <MemberInfoSection user={data.member} />
        </div>
      )}
    </>
  )
}
