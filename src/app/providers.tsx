'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { useAuthStore } from '@/stores/login'

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    // 로그인 상태 체크
    useAuthStore.getState().checkToken()
  }, [])

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
