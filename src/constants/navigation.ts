import NavPlaceIcon from '@/assets/nav-place.svg'
import NavTransitIcon from '@/assets/nav-transit.svg'
import NavHomeIcon from '@/assets/nav-home.svg'
import NavCalendarIcon from '@/assets/nav-calendar.svg'
import NavCommunityIcon from '@/assets/nav-community.svg'

export const NAV_BUTTONS = [
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
