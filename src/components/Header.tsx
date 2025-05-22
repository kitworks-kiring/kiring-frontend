'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import HeaderLogo from '@/assets/header-logo.svg'
import DefaultProfile from '@/assets/default-profile.svg'
import SvgButton from '@/components/SvgButton'

export default function Header() {
  const router = useRouter()
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-4">
        <SvgButton
          ariaLabel="홈으로 이동"
          icon={<HeaderLogo />}
          onClick={() => router.push('/')}
        />
      </div>
      <div className="flex items-center gap-4">
        <p className="text-head4">
          {status === 'loading' ? '로딩중...' : session?.user ? '로그인됨' : '비로그인'}
        </p>
        <SvgButton
          ariaLabel="마이페이지로 이동"
          icon={
            status === 'loading' ? (
              <DefaultProfile />
            ) : session?.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || '프로필'}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <DefaultProfile />
            )
          }
          onClick={() => router.push('/mypage')}
        />
      </div>
    </header>
  )
}
