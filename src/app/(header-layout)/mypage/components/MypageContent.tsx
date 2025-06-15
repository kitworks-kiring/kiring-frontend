'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useQuery } from '@tanstack/react-query'
import { getMemberMe } from '@/services/member'
import { MemberMeType } from '@/app/types/memberType'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import PlaneSection from '@/app/(header-layout)/mypage/components/plane/PlaneSection'
import MemberInfoSection from '@/app/(header-layout)/mypage/components/memberinfo/MemberInfoSection'
import ProfileSection from '@/app/(header-layout)/mypage/components/profile/ProfileSection'

export default function MyPage() {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery<{ member: MemberMeType }>({
    queryKey: ['memberMe'],
    queryFn: getMemberMe,
    refetchOnWindowFocus: false,
  })

  const debugEmpty = false // 디버그용, 실제 배포 시에는 false로 설정
  const user = !debugEmpty ? data?.member : null

  if (isError) {
    router.push('/error')
  }

  useEffect(() => {
    console.log('api test user', user)
  }, [user])

  // ✅ 로그아웃 시 토큰 삭제
  const handleLogout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
  }

  return (
    <>
      {(isLoading || !user) && (
        <>
          <section className="nav-pd h-full">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <p className="flex-row-center body3 h-full text-gray-800">
                사용자 정보를 조회할 수 없습니다.
              </p>
            )}
          </section>
        </>
      )}
      {user && (
        <div className="flex flex-col gap-6">
          <ProfileSection user={user} />
          <MemberInfoSection user={user} />
          <div className="container px-4">
            <hr></hr>
          </div>
          <PlaneSection />
          {/* logout */}
          <section className="container border border-t-8 border-gray-50">
            <div className="px-4 py-5">
              <button type="button" onClick={handleLogout} className="text-system-red">
                로그아웃
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
