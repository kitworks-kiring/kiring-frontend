'use client'

import HeaderLogo from '@/assets/header-logo.svg'
import DefaultProfile from '@/assets/default-profile.svg'
import SvgButton from '@/components/ui/SvgButton'
import { NAV_BUTTONS } from '@/components/layout/Navigation/constants'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const matchedNavItem = NAV_BUTTONS.find(
    ({ endpoint }) => endpoint === pathname || endpoint === '/',
  )

  return (
    <nav aria-label="헤더 네비게이션" className="fixed top-0 h-14 w-full max-w-150 bg-white p-4">
      <div className="flex h-full w-full justify-between">
        {matchedNavItem?.endpoint === '/' ? (
          <SvgButton
            ariaLabel="홈으로 이동"
            icon={<HeaderLogo />}
            onClick={() => router.push('/')}
          />
        ) : (
          <p className="font-body2-sb">{matchedNavItem?.title}</p>
        )}
        <div className="flex gap-3">
          {/* TODO: 2차 알림 버튼 추가 */}
          <SvgButton
            ariaLabel="마이페이지로 이동"
            icon={<DefaultProfile />}
            onClick={() => router.push('/mypage')}
          />
        </div>
      </div>
    </nav>
  )
}
