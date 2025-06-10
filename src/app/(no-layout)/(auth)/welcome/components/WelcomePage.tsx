'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const EMOJIS = ['🎉', '✨', '🎈', '🥳', '💫', '🎊']

export default function WelcomePage() {
  const router = useRouter()
  const [user, setUser] = useState<{
    name?: string
    nickname?: string
    email?: string
    team?: { name: string }
    profileImageUrl?: string
    kiringImageUrl?: string
  } | null>(null)
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

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
      .then((data) => {
        const member = data?.data?.member
        setUser(member)

        // 애니메이션 실행 트리거
        setTimeout(() => setShowAnimation(true))
      })
      .catch((err) => {
        console.error('사용자 정보 조회 실패:', err)
      })

    localStorage.setItem('welcomeShown', 'true')
    const isWelcomeShown = localStorage.getItem('welcomeShown')
    if (isWelcomeShown) {
      router.replace('/')
      return
    }
  }, [])

  const handleMypage = () => {
    router.push('/mypage')
  }

  if (!isAuthChecked || !user) return null
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-purple-300 to-purple-600 px-4 py-10 text-white">
      <div className="flex-col-center z-10 mt-22 flex w-full max-w-md gap-6">
        <div className="head2">{user?.name}님</div>
        <div className="head5 text-white">키링에 오신걸 환영해요, 당신과 함께할 키링이에요!</div>
      </div>

      <div className={clsx('relative z-10', showAnimation && 'animate-pop')}>
        <Image
          src={user?.kiringImageUrl ?? '/default-kiring.png'}
          alt="사용자 프로필"
          width={320}
          height={320}
          className="mx-auto rounded-full"
          priority
        />
      </div>

      <div className="body2 z-10 w-full space-y-6">
        <button
          type="button"
          onClick={handleMypage}
          className="flex-row-center w-full gap-3 rounded-xl bg-white px-4 py-4 text-purple-500"
        >
          내 프로필 보러가기
        </button>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full text-white/90 underline"
        >
          나중에 하기
        </button>
      </div>

      {showAnimation && <EmojiBurst emojis={EMOJIS} />}
    </div>
  )
}

// 🎇 이모티콘 팡팡 컴포넌트
function EmojiBurst({ emojis }: { emojis: string[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {Array.from({ length: 12 }).map((_, i) => {
        const emoji = emojis[i % emojis.length]
        const left = Math.random() * 100
        const top = Math.random() * 100
        const delay = Math.random() * 0.5
        const rotate = Math.random() * 360

        return (
          <div
            key={i}
            className="animate-burst absolute text-2xl"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              transform: `rotate(${rotate}deg)`,
            }}
          >
            {emoji}
          </div>
        )
      })}
    </div>
  )
}

;<style></style>
