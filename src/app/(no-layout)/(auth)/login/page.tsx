'use client'

import { LOGIN_ERROR_MESSAGES } from '@/app/(no-layout)/(auth)/login/constants'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

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
    if (error) {
      // 에러 메시지
      alert(showLoginErrorMessage(error))

      // 메시지 확인 후 ?error= 파라미터 제거
      removeErrorParam()
    }
  }, [error])

  const showLoginErrorMessage = (type?: string): string => {
    return (
      LOGIN_ERROR_MESSAGES.find((err) => err.type === type)?.message ??
      LOGIN_ERROR_MESSAGES.find((err) => err.type === 'Default')!.message
    )
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
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">로그인</h2>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={handleKakaoLogin}
            className="group relative flex w-full justify-center rounded-md bg-[#FEE500] px-3 py-2 text-sm font-semibold text-black hover:bg-[#FDD835] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEE500]"
          >
            카카오로 로그인
          </button>
        </div>
      </div>
    </div>
  )
}
