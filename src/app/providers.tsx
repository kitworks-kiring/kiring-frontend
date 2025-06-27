'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import AuthProvider from '@/components/auth/AuthProvider'

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
