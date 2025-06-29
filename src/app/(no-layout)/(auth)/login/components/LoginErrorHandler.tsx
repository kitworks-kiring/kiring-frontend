'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { LOGIN_ERROR_MESSAGES } from '@/app/(no-layout)/(auth)/login/constants'

export default function LoginErrorHandler() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('errorCode')
  const hasShown = useRef(false)

  useEffect(() => {
    if (!errorCode || hasShown.current) return
    hasShown.current = true
    // 에러 메시지
    showLoginErrorMessage(errorCode)
    // 메시지 확인 후 ?errorCode= 파라미터 제거
    removeErrorParams()
  }, [errorCode])

  const showLoginErrorMessage = (type?: string): void => {
    const errorItem =
      LOGIN_ERROR_MESSAGES.find((err) => err.type === type) ??
      LOGIN_ERROR_MESSAGES.find((err) => err.type === 'ERR_Default')!

    const { message, confirmable } = errorItem

    if (confirmable) {
      const shouldRetry = confirm(message)
      if (shouldRetry) {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao'`
      }
      return
    }
    alert(message)
  }

  const removeErrorParams = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('errorCode')
    window.history.replaceState({}, '', url.toString())
  }

  return null
}
