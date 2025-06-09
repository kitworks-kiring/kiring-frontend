'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function LoginCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')
    const errorCode = searchParams.get('errorCode')

    if (errorCode) {
      const loginUrl = new URL('/login', window.location.origin)
      loginUrl.searchParams.set('errorCode', errorCode)
      router.replace(loginUrl.toString())
      return
    }

    if (!accessToken || !refreshToken) {
      router.replace('/login')
      return
    }

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    const isWelcomeShown = localStorage.getItem('welcomeShown')
    if (!isWelcomeShown) {
      localStorage.setItem('welcomeShown', 'true')
      router.replace('/welcome')
      return
    }

    router.replace('/')
  }, [searchParams, router])

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <LoadingSpinner />
    </div>
  )
}
