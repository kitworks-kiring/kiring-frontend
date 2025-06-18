'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { useAuthStore } from '@/stores/login'
import { usePathname, useRouter } from 'next/navigation'

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  const pathname = usePathname()
  const router = useRouter()
  const { isLogin } = useAuthStore()

  useEffect(() => {
    // 로그인 상태 체크
    useAuthStore.getState().checkToken()
    const user = localStorage.getItem('kiring-user')
    if (isLogin && !user) {
      useAuthStore.getState().setLogout()
      router.push('/login')
    }
  }, [pathname, router])

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
