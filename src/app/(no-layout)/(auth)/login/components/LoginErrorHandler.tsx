'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { LOGIN_ERROR_MESSAGES } from '@/app/(no-layout)/(auth)/login/constants'
import { signIn } from 'next-auth/react'

export default function LoginErrorHandler() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (!error || error === 'callback') return

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

  return null
}
