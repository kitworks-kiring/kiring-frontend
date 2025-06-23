import NavPlaceIcon from '@/assets/nav-place.svg'
import NavTransitIcon from '@/assets/nav-transit.svg'
import NavHomeIcon from '@/assets/nav-home.svg'
import NavCalendarIcon from '@/assets/nav-calendar.svg'
import NavCommunityIcon from '@/assets/nav-community.svg'

export interface NavButtons {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  endpoint: string
}

export interface HeaderPage {
  title: string
  endpoint: string
  showProfileIcon: boolean
  showBackButton: boolean
}

export const NAV_BUTTONS: NavButtons[] = [
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

export const HEADER_PAGES: HeaderPage[] = [
  {
    title: '프로필',
    endpoint: '/profile',
    showProfileIcon: false,
    showBackButton: true,
  },
  {
    title: '종이비행기 보내기',
    endpoint: '/plane',
    showProfileIcon: false,
    showBackButton: true,
  },
]
