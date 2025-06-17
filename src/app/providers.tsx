'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { useAuthStore } from '@/stores/login'
import { usePathname } from 'next/navigation'

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  const pathname = usePathname()
  const { isLogin } = useAuthStore()
  useEffect(() => {
    // 로그인 상태 체크
    useAuthStore.getState().checkToken()
    console.log('🚀 ~ Providers ~ pathname:', pathname)
    console.log('🚀 ~ Providers ~ pathname:', isLogin)
  }, [pathname, isLogin])

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
