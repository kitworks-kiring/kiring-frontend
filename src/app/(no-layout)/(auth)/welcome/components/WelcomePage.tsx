'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import WelcomeEffect from '@/app/(no-layout)/(auth)/welcome/components/WelcomeEffect'
import { axiosInstance } from '@/lib/api/axios'

export default function WelcomePage() {
  const router = useRouter()
  const [user, setUser] = useState<{
    name?: string
    kiringImageUrl?: string
  } | null>(null)
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

  useEffect(() => {
    axiosInstance
      .get('/members/me')
      .then((res) => {
        setUser(res.data?.data?.member)
        // 웰컴 페이지 노출 여부 저장
        localStorage.setItem('welcomeShown', 'true')
        // 애니메이션 효과
        setTimeout(() => setShowAnimation(true))
      })
      .catch((err) => {
        console.error('사용자 정보 조회 실패:', err)
      })
  }, [])

  const handleMypage = () => {
    router.push('/mypage')
  }

  if (!isAuthChecked || !user) return null
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-purple-300 to-purple-600 px-4 py-10 text-white">
      <div className="flex-col-center z-10 mt-22 flex w-full max-w-md gap-6">
        <div className="head2">{user?.name}님</div>
        <div className="head5 text-white">키링에 오신걸 환영해요, 당신과 함께할 키링이에요!</div>
      </div>

      {/* 키링 이미지 */}
      <div className={clsx('relative z-10', showAnimation && 'effect-profile fade-scale-profile')}>
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
  )
}
