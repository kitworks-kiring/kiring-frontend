'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import WelcomeEffect from '@/app/(no-layout)/(auth)/welcome/components/WelcomeEffect'
import { useQuery } from '@tanstack/react-query'
import { getMemberMe } from '@/services/member'
import { MemberMeType } from '@/app/types/memberType'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function WelcomePage() {
  const router = useRouter()
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    const isWelcomeShown = localStorage.getItem('welcomeShown')
    if (isWelcomeShown) {
      router.replace('/')
      return
    }

    setIsAuthChecked(true)
  }, [router])

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
    if (user && !localStorage.getItem('welcomeShown')) {
      localStorage.setItem('welcomeShown', 'true')
      setTimeout(() => setShowAnimation(true))
    }
  }, [user])

  const handleMypage = () => {
    router.push('/mypage')
  }

  return (
    <>
      {!isAuthChecked || isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {!user ? (
            <div className="flex-row-center body3 h-full text-gray-800">
              사용자 정보를 조회할 수 없습니다.
            </div>
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-purple-300 to-purple-600 px-4 py-10 text-white">
              <div className="flex-col-center z-10 mt-22 flex w-full max-w-md gap-6">
                <div className={clsx('head2 effect-name', showAnimation && 'fade-name')}>
                  {user?.name}님
                </div>
                <div
                  className={clsx(
                    'head5 effect-welcome text-white',
                    showAnimation && 'fade-welcome',
                  )}
                >
                  키링에 오신걸 환영해요, 당신과 함께할 키링이에요!
                </div>
              </div>

              {/* 키링 이미지 */}
              <div
                className={clsx(
                  'effect-profile relative z-10',
                  showAnimation && 'fade-scale-profile float-profile',
                )}
              >
                <Image
                  src={user?.kiringImageUrl ?? '/default-kiring.png'}
                  alt="사용자 프로필"
                  width={320}
                  height={320}
                  className="mx-auto rotate-10 rounded-full"
                  priority
                />
              </div>

              <div className="body2 z-10 w-full space-y-6">
                <button
                  type="button"
                  onClick={handleMypage}
                  className="flex-row-center w-full gap-3 rounded-xl bg-white px-4 py-4 text-purple-500"
                >
                  내 프로필 보러가기
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="w-full text-white/90 underline"
                >
                  나중에
                </button>
              </div>

              {/* 애니메이션 효과 */}
              {showAnimation && <WelcomeEffect />}
            </div>
          )}
        </>
      )}
    </>
  )
}
