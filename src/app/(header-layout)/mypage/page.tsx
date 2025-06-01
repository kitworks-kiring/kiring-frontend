'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
export default function MyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' })
  }

  const isLoading = status === 'loading'
  const isLoggedIn = status === 'authenticated' && session

  if (isLoading || !isLoggedIn) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md space-y-8">
        <div className="text-center">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || '프로필'}
              width={96}
              height={96}
              className="mx-auto rounded-full"
              priority
            />
          )}
          <h2 className="head3 mt-4">{session.user?.name || '사용자'}</h2>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="bg-system-red body2 w-full rounded-md px-4 py-3 text-white"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  )
}
