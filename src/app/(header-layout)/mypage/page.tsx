'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function MyPage() {
  const router = useRouter()
  const [user, setUser] = useState<{
    nickname?: string
    email?: string
    team?: { name: string }
    profileImageUrl?: string
  } | null>(null)
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
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return

    fetch(`${process.env.NEXT_PUBLIC_API_URL}members/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data?.data?.member))
      .catch((err) => {
        console.error('사용자 정보 조회 실패:', err)
      })
  }, [])

  // ✅ 로그아웃 시 토큰 삭제
  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    router.push(`${process.env.NEXT_PUBLIC_API_URL}auth/logout`)
  }

  if (!isAuthChecked) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md space-y-8">
        <div className="text-center">
          <Image
            src={user?.profileImageUrl ?? '/default-avatar.png'}
            alt="사용자 프로필"
            width={96}
            height={96}
            className="mx-auto rounded-full"
            priority
          />
          <h2 className="head3 mt-4">{user?.nickname ?? '사용자'}</h2>
          <div className="mt-2 text-gray-600">{user?.email}</div>
          <div className="mt-1 text-gray-500">{user?.team?.name}</div>
        </div>

        <div className="space-y-4">
          <button
            type="button"
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
