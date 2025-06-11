'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Cookies from 'js-cookie'

export default function LoginCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')
    const errorCode = searchParams.get('errorCode')

    // 에러 처리
    if (errorCode) {
      const loginUrl = new URL('/login', window.location.origin)
      loginUrl.searchParams.set('errorCode', errorCode)
      router.replace(loginUrl.toString())
      return
    }

    // 토큰 없으면 로그인 페이지
    if (!accessToken || !refreshToken) {
      router.replace('/login')
      return
    }

    // 로그인 성공 시 쿠키 저장
    Cookies.set('accessToken', accessToken, { path: '/', expires: 0.02 }) // 약 30분
    Cookies.set('refreshToken', refreshToken, { path: '/', expires: 7 }) // 7일 유효

    // 첫 로그인시 환영 페이지로 리다이렉트
    const isWelcomeShown = localStorage.getItem('welcomeShown')
    if (!isWelcomeShown) {
      router.replace('/welcome')
      return
    }

    // 로그인 성공시 홈으로 리다이렉트
    router.replace('/')
  }, [searchParams, router])

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <LoadingSpinner />
    </div>
  )
}
