'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import LoginLogo from '@/assets/login-logo.svg'
import IcoKakao from '@/assets/ico-kakao.svg'
import LoginErrorHandler from '@/app/(no-layout)/(auth)/login/components/LoginErrorHandler'
export default function LoginPage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') router.push('/')
  }, [status, router])

  const handleKakaoLogin = () => {
    signIn('kakao', { callbackUrl: '/' })
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-purple-300 to-purple-600 px-4 py-10 text-white">
      {/* 오류 메시지 처리 */}
      <LoginErrorHandler />

      <div className="mt-25 flex w-full max-w-md flex-col items-start">
        <div className="mb-6 text-6xl font-bold tracking-tight">
          <LoginLogo />
        </div>

        <div className="head3 mb-5">회사생활의 연결고리, 키링</div>
        <div className="body2 text-white/90">
          맛집부터 커뮤니티, 팀 일정 관리까지
          <br />
          회사생활에 필요한 모든 서비스를 한번에
        </div>
      </div>

      <div className="body2 w-full space-y-6">
        <button
          type="button"
          onClick={handleKakaoLogin}
          className="bg-sns-kakao flex-row-center w-full gap-3 rounded-xl px-4 py-4 text-black"
        >
          <IcoKakao /> 카카오로 시작하기
        </button>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full text-white/90 underline"
        >
          로그인 없이 이용하기
        </button>
      </div>
    </div>
  )
}
