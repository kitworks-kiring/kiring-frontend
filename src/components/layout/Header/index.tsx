'use client'

import Image from 'next/image'
import HeaderLogo from '@/assets/header-logo.svg'
import ArrowHeader from '@/assets/arrow-header.svg'
import DefaultProfile from '@/assets/default-profile.svg'
import SvgButton from '@/components/ui/SvgButton'
import { NAV_BUTTONS, HEADER_PAGES } from '@/components/layout/Navigation/constants'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/login'
import { useUserStore } from '@/stores/user'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { isLogin } = useAuthStore()
  const { user } = useUserStore()

  const PAGES = [...NAV_BUTTONS, ...HEADER_PAGES]

  const matchedNavItem =
    PAGES.find(({ endpoint }) => pathname === endpoint || pathname.startsWith(endpoint + '/')) ??
    PAGES.find(({ endpoint }) => endpoint === '/')

  return (
    <nav aria-label="헤더 네비게이션" className="full-width fixed top-0 z-100 h-14 bg-white p-4">
      <div className="flex h-full w-full justify-between">
        <div className="flex items-center gap-4">
          {matchedNavItem &&
            'showBackButton' in matchedNavItem &&
            matchedNavItem.showBackButton && (
              <SvgButton
                ariaLabel="뒤로가기"
                icon={<ArrowHeader />}
                onClick={() => router.back()}
              />
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
          {isLogin ? (
            matchedNavItem && 'showProfileIcon' in matchedNavItem ? (
              matchedNavItem.showProfileIcon ? (
                <SvgButton
                  ariaLabel="마이페이지로 이동"
                  icon={<DefaultProfile />}
                  onClick={() => router.push('/mypage')}
                />
              ) : null // showProfileIcon이 false면 아무 것도 안 보여줌
            ) : user?.profileImageUrl ? (
              <button
                className="h-6 w-6 overflow-hidden rounded-full"
                onClick={() => router.push('/profile')}
              >
                <Image
                  src={user.profileImageUrl}
                  alt="profile"
                  width={24}
                  height={24}
                  className="aspect-square h-6 w-6 scale-140 object-contain"
                />
              </button>
            ) : null
          ) : (
            <button onClick={() => router.push('/login')}>
              <span className="body2-sb mt-0.5 text-purple-500">로그인</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
