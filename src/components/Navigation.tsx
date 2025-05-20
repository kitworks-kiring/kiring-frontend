'use client'

import SvgButton from '@/components/SvgButton'
import NavPlaceIcon from '@/assets/nav-place.svg'
import NavTransitIcon from '@/assets/nav-transit.svg'
import NavHomeIcon from '@/assets/nav-home.svg'
import NavCalendarIcon from '@/assets/nav-calendar.svg'
import NavCommunityIcon from '@/assets/nav-community.svg'
import { usePathname, useRouter } from 'next/navigation'

const NAV_BUTTONS = [
  {
    icon: NavPlaceIcon,
    title: '플레이스',
    endpoint: '/place',
  },
  {
    icon: NavTransitIcon,
    title: '교통',
    endpoint: '/transit',
  },
  {
    icon: NavHomeIcon,
    title: '홈',
    endpoint: '/',
  },
  {
    icon: NavCalendarIcon,
    title: '캘린더',
    endpoint: '/calendar',
  },
  {
    icon: NavCommunityIcon,
    title: '커뮤니티',
    endpoint: '/community',
  },
]

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 h-18 w-full max-w-150 rounded-t-[12px] bg-white px-6 shadow-[0_-1px_5px_0_rgba(0,0,0,0.1)]">
      <div className="flex h-full w-full justify-between">
        {NAV_BUTTONS.map(({ title, icon: Icon, endpoint }) => {
          const isActive = pathname === endpoint
          const color = isActive ? 'text-purple-500' : 'text-gray-300'

          return (
            <SvgButton
              key={title}
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
