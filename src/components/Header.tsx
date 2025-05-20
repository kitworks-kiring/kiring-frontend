'use client'

import HeaderLogo from '@/assets/header-logo.svg'
import DefaultProfile from '@/assets/default-profile.svg'
import SvgButton from '@/components/SvgButton'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  return (
    <nav className="fixed top-0 h-14 w-full max-w-150 bg-white p-4">
      <div className="flex h-full w-full justify-between">
        <SvgButton icon={<HeaderLogo />} onClick={() => router.push('/')} />
        <div className="flex gap-3">
          {/* TODO: 2차 알림 버튼 추가 */}
          <SvgButton icon={<DefaultProfile />} onClick={() => router.push('/mypage')} />
        </div>
      </div>
    </nav>
  )
}
