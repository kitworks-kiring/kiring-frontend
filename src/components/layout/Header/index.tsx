'use client'

import HeaderLogo from '@/assets/header-logo.svg'
import ArrowHeader from '@/assets/arrow-header.svg'
import DefaultProfile from '@/assets/default-profile.svg'
import SvgButton from '@/components/ui/SvgButton'
import { NAV_BUTTONS } from '@/components/layout/Navigation/constants'
import { useRouter, usePathname } from 'next/navigation'

export default function Header({ isBackButton }: { isBackButton?: boolean }) {
  const router = useRouter()
  const pathname = usePathname()

  const matchedNavItem =
    NAV_BUTTONS.find(({ endpoint }) => endpoint === pathname) ??
    NAV_BUTTONS.find(({ endpoint }) => endpoint === '/')

  return (
    <nav aria-label="헤더 네비게이션" className="full-width fixed top-0 z-10 h-14 bg-white p-4">
      <div className="flex h-full w-full justify-between">
        <div className="flex items-center gap-4">
          {isBackButton && (
            <SvgButton ariaLabel="뒤로가기" icon={<ArrowHeader />} onClick={() => router.back()} />
          )}
          {matchedNavItem?.endpoint === '/' ? (
            <SvgButton
              ariaLabel="홈으로 이동"
              icon={<HeaderLogo />}
              onClick={() => router.push('/')}
            />
          ) : (
            <p className="body2-sb">{matchedNavItem?.title}</p>
          )}
        </div>
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
