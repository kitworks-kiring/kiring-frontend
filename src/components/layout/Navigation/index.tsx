'use client'

import SvgButton from '@/components/ui/SvgButton'
import { NAV_BUTTONS } from '@/components/layout/Navigation/constants'
import { usePathname, useRouter } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav
      aria-label="메인 네비게이션"
      className="nav-shadow fixed bottom-0 h-18 w-full max-w-110 px-6"
    >
      <div className="flex h-full w-full justify-between">
        {NAV_BUTTONS.map(({ title, icon: Icon, endpoint }) => {
          // 홈('/')의 경우 정확히 일치할 때만 활성화
          const isActive = endpoint === '/' ? pathname === '/' : pathname.startsWith(endpoint)
          const color = isActive ? 'text-purple-500' : 'text-gray-300'

          return (
            <SvgButton
              key={endpoint}
              ariaLabel={`${title} 탭으로 이동`}
              icon={<Icon className={color} />}
              onClick={() => router.push(endpoint)}
              bottomTitle={<span className={`body4 ${color}`}>{title}</span>}
            />
          )
        })}
      </div>
    </nav>
  )
}
