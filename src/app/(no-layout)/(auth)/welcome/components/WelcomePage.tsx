'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function WelcomePage() {
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

  const handleMypage = () => {
    router.push('/mypage')
  }

  if (!isAuthChecked) return null

  return (
    <div className="flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-purple-300 to-purple-600 px-4 py-10 text-white">
      <div className="mt-25 flex w-full max-w-md flex-col items-start">
        <div className="head3 mb-5">회사생활의 연결고리, 키링</div>
        <div className="body2 text-white/90">
          맛집부터 커뮤니티, 팀 일정 관리까지
          <br />
          회사생활에 필요한 모든 서비스를 한번에
        </div>
      </div>
      <Image
        src={user?.profileImageUrl ?? '/default-avatar.png'}
        alt="사용자 프로필"
        width={96}
        height={96}
        className="mx-auto rounded-full"
        priority
      />
      <div className="body2 w-full space-y-6">
        <button
          type="button"
          onClick={handleMypage}
          className="flex-row-center w-full gap-3 rounded-xl bg-white px-4 py-4 text-black"
        >
          프로필 만들기
        </button>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full text-white/90 underline"
        >
          나중에 하기
        </button>
      </div>
    </div>
  )
}
