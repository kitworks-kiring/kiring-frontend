'use client'

export const dynamic = 'force-dynamic'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useAuthStore } from '@/stores/login'
import { getMemberMe } from '@/services/member'
import { useUserStore } from '@/stores/user'

export default function LoginCallbackPage() {
  const router = useRouter()
  const { setLogin } = useAuthStore()
  const { setUser } = useUserStore()
  const searchParams = useSearchParams()

  const accessToken = searchParams.get('accessToken')
  const refreshToken = searchParams.get('refreshToken')
  const errorCode = searchParams.get('errorCode')

  useEffect(() => {
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
    setLogin(accessToken, refreshToken)
  }, [accessToken, refreshToken, errorCode, router, setLogin])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { member } = await getMemberMe()
        setUser(member)
        router.replace('/')
      } catch (e) {
        console.error('❌ 유저 정보 조회 실패', e)
        router.replace('/login')
      }
    }

    fetchUser()
  }, [accessToken, refreshToken, router, setUser])

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <LoadingSpinner />
    </div>
  )
}
