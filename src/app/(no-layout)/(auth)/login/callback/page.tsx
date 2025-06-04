'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function LoginCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isAuthChecked, setIsAuthChecked] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      router.push('/login')
      return
    }
    setIsAuthChecked(true)
  }, [router])

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      router.push('/') // ✅ 메인 페이지로 이동
    } else {
      alert('로그인 실패')
      router.push('/login')
    }
  }, [searchParams, router])

  // ✅ 인증 상태 확인 중일 때 로딩 스피너 표시
  if (!isAuthChecked) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <LoadingSpinner />
      </div>
    )
  }
}
