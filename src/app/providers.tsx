'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
<<<<<<< HEAD
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
=======
import AuthProvider from '@/components/auth/AuthProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
>>>>>>> 64d3972990d1586e570793008f82eb9a028cec9f

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
