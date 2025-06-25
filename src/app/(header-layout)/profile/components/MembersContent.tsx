'use client'

import { useQuery } from '@tanstack/react-query'
import { getMemberById } from '@/services/member'
import { useParams } from 'next/navigation'
import ProfileSection from '@/app/(header-layout)/profile/components/profile/ProfileSection'
import MemberInfoSection from '@/app/(header-layout)/profile/components/memberinfo/MemberInfoSection'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function MemberPage() {
  const { memberId } = useParams()
  const id = Number(memberId)

  const { data, isLoading, error } = useQuery({
    queryKey: ['member', id],
    queryFn: () => getMemberById(id),
    enabled: !!id,
  })

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error ||
        (!data && (
          <section className="nav-pd h-full">
            <p className="flex-row-center body3 h-full text-gray-800">
              멤버 정보를 조회할 수 없습니다.
            </p>
          </section>
        ))}
      {data && (
        <div className="flex flex-col gap-6">
          <ProfileSection user={data.member} />
          <MemberInfoSection user={data.member} />
        </div>
      )}
    </>
  )
}
