'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import HeaderLogo from '@/assets/header-logo.svg'
import ArrowHeader from '@/assets/arrow-header.svg'
import SvgButton from '@/components/ui/SvgButton'
import { NAV_BUTTONS, HEADER_PAGES } from '@/components/layout/Navigation/constants'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/login'
import { useUserStore } from '@/stores/user'

export default function Header() {
  const [isTop, setIsTop] = useState(true)

  const router = useRouter()
  const pathname = usePathname()
  const { isLogin } = useAuthStore()
  const { user } = useUserStore()

  useEffect(() => {
    // 1. <main> element 탐색
    const findMainElement = () => {
      return document.querySelector('main') as HTMLElement | null
    }

    // 2. 스크롤 핸들러
    const handleScroll = () => {
      const mainEl = findMainElement()
      if (!mainEl) return

      const scrollTop = mainEl.scrollTop
      const newIsTop = scrollTop <= 0
      if (newIsTop !== isTop) setIsTop(newIsTop)
    }

    // 3. throttle 적용해 이벤트 리스너 등록
    let timeoutId: NodeJS.Timeout | null = null
    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll()
          timeoutId = null
        }, 100)
      }
    }

    const mainEl = findMainElement()
    if (mainEl) {
      mainEl.addEventListener('scroll', throttledScroll)
      handleScroll()
    }

    return () => {
      if (mainEl) mainEl.removeEventListener('scroll', throttledScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isTop])

  useEffect(() => {
    console.log('isTop:', isTop)
  }, [isTop])

  const matchedNavItem = useMemo(() => {
    return (
      HEADER_PAGES.find(
        ({ endpoint }) => pathname === endpoint || pathname.startsWith(endpoint + '/'),
      ) ??
      NAV_BUTTONS.find(({ endpoint }) => endpoint === pathname) ??
      NAV_BUTTONS.find(({ endpoint }) => endpoint === '/')!
    )
  }, [pathname])

  const ProfileButton = () => {
    return (
      <button
        className="h-6 w-6 overflow-hidden rounded-full"
        onClick={() => router.push('/profile')}
      >
        <Image src={user?.profileImageUrl ?? ''} alt="profile" width={24} height={24} />
      </button>
    )
  }

  return (
    <nav
      aria-label="헤더 네비게이션"
      className={clsx(
        'full-width fixed top-0 z-50 h-14 p-4',
        pathname !== '/' && 'bg-white',
        pathname === '/' && (isTop ? 'bg-gradient-to-t from-[#f7f5ff] to-[#fefeff]' : 'bg-white'),
      )}
    >
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
                <ProfileButton />
              ) : null
            ) : user?.profileImageUrl ? (
              <ProfileButton />
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
