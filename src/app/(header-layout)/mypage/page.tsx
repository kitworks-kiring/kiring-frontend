'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useQuery } from '@tanstack/react-query'
import { getMemberMe } from '@/services/member'
import { MemberMeType } from '@/app/types/memberType'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

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
        <>
          <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-md space-y-8">
              <div className="text-center">
                <Image
                  src={user?.profileImageUrl ?? '/default-avatar.png'}
                  alt="사용자 프로필"
                  width={96}
                  height={96}
                  className="mx-auto rounded-full"
                  priority
                />
                <h2 className="head3 mt-4">{user?.nickname ?? '사용자'}</h2>
                <div className="mt-2 text-gray-600">{user?.email}</div>
                <div className="mt-1 text-gray-500">{user?.team?.name}</div>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-system-red body2 w-full rounded-md px-4 py-3 text-white"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
