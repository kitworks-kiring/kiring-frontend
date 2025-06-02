'use client'

import { LOGIN_ERROR_MESSAGES } from '@/app/(no-layout)/(auth)/login/constants'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import LoginLogo from '@/assets/login-logo.svg'
import IcoKakao from '@/assets/ico-kakao.svg'

export default function LoginPage() {
  const { status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    // 로그인 세션 유효 상태
    if (status === 'authenticated') {
      router.push('/')
    }
  }, [status, router])

  useEffect(() => {
    if (!error || error === 'callback') return // 에러가 없거나 콜백 에러는 무시
    // 에러 메시지
    showLoginErrorMessage(error)

    // 메시지 확인 후 ?error= 파라미터 제거
    removeErrorParam()
  }, [error])

  const showLoginErrorMessage = (type?: string): void => {
    const errorItem =
      LOGIN_ERROR_MESSAGES.find((err) => err.type === type) ??
      LOGIN_ERROR_MESSAGES.find((err) => err.type === 'Default')!

    const { message, confirmable } = errorItem

    if (confirmable) {
      const shouldRetry = confirm(message)
      if (shouldRetry) {
        signIn('kakao', { callbackUrl: '/', prompt: 'login' })
      }
      return
    }
    alert(message)
  }

  const removeErrorParam = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('error')
    window.history.replaceState({}, '', url.toString())
  }

  const handleKakaoLogin = () => {
    signIn('kakao', { callbackUrl: '/' })
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-purple-300 to-purple-600 px-4 py-10 text-white">
      <div className="mt-25 flex w-full max-w-md flex-col items-start">
        {/* 로고 */}
        <div className="mb-6 text-6xl font-bold tracking-tight">
          <LoginLogo />
        </div>

        {/* 슬로건 */}
        <div className="head3 mb-5">회사생활의 연결고리, 키링</div>
        <div className="body2 text-white/90">
          맛집부터 커뮤니티, 팀 일정 관리까지
          <br />
          회사생활에 필요한 모든 서비스를 한번에
        </div>
      </div>

      {/* 로그인 버튼 */}
      <div className="body2 w-full space-y-6">
        <button
          onClick={handleKakaoLogin}
          className="bg-sns-kakao flex-row-center w-full gap-3 rounded-xl px-4 py-4 text-black"
        >
          <IcoKakao /> 카카오로 시작하기
        </button>

        <button onClick={() => router.push('/')} className="w-full text-white/90 underline">
          로그인 없이 이용하기
        </button>
      </div>
    </div>
  )
}
