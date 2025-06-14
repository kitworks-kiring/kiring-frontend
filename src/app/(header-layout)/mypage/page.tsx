'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { useQuery } from '@tanstack/react-query'
import { getMemberMe } from '@/services/member'
import { MemberMeType } from '@/app/types/memberType'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getElapsedPeriodFromJoinDate } from '@/utils/date'
import { planeMessages } from '@/app/(header-layout)/mypage/constants'
import PlaneMessageCard from '@/app/(header-layout)/mypage/components/PlaneMessageCard'
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

  function MemberInfoItem({ label, value }: { label: string; value: React.ReactNode }) {
    return (
      <li className="body4 flex items-center">
        <span className="w-20 text-gray-500">{label}</span>
        <span className="text-gray-900">{value}</span>
      </li>
    )
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
          {/* profile */}
          <section className="mx-aut container px-4 py-3">
            <div className="flex-row-center min-h-53 w-full gap-12 rounded-xl bg-white py-8 shadow-[0px_1px_10px_rgba(0,0,0,0.15)]">
              <div className="flex-col-center">
                <Image
                  src={user?.profileImageUrl ?? '/default-avatar.png'}
                  alt="사용자 프로필"
                  width={100}
                  height={100}
                  className="mx-auto rounded-full"
                  priority
                />
                <h2 className="head5 mt-2 text-black">{user?.name}</h2>
              </div>
              <div className="flex flex-col gap-2 text-left">
                <p className="body5 text-gray-900">팀 구성</p>
                <div className="body3-sb text-black">{user?.team?.name}</div>
                <hr className="my-1"></hr>
                <p className="body5 text-gray-900">함께 한 시간</p>
                <div className="body3-sb text-black">
                  {' '}
                  {user?.joinedAt && getElapsedPeriodFromJoinDate(user.joinedAt)}
                </div>
              </div>
            </div>
          </section>
          {/* memberInfo */}
          <section className="container px-4">
            <div className="head5">
              <p className="text-balck">나의 정보</p>
            </div>
            <div className="mt-3 w-full">
              <ul className="space-y-4">
                <MemberInfoItem label="입사일" value={user?.joinedAt} />
                <MemberInfoItem label="생일" value={user?.birthday} />
                <MemberInfoItem
                  label="전화번호"
                  value={
                    <a className="text-purple-300" href={`tel:${user?.phone}`}>
                      {user?.phone}
                    </a>
                  }
                />
                <MemberInfoItem
                  label="이메일"
                  value={
                    <a className="text-purple-300" href={`mailto:${user?.email}`}>
                      {user?.email}
                    </a>
                  }
                />
                <MemberInfoItem label="깃허브" value={user?.githubId} />
              </ul>
            </div>
          </section>
          <div className="container px-4">
            <hr></hr>
          </div>
          {/* plane */}
          <section className="container pl-4">
            <div className="head5">
              <p className="text-black">내가 받은 종이비행기</p>
            </div>

            <div className="mt-4 overflow-x-auto">
              <ul className="flex gap-4">
                {planeMessages.map((plane) => (
                  <PlaneMessageCard key={plane.id} plane={plane} />
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="flex-row-center body4 mt-6 w-full gap-3 rounded-xl border border-black px-4 py-4 text-black"
            >
              종이비행기 {planeMessages.length}개 모두 보기
            </button>
          </section>
          <section className="container px-4">
            <div className="mx-auto max-w-md space-y-8">
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
          </section>
        </div>
      )}
    </>
  )
}
