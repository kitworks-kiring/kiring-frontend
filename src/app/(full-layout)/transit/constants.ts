import { BubbleItem } from '@/components/tabs/BubbleTab'
import { TabItem } from '@/components/tabs/DefaultTab'

export const TRANSIT_TABS: TabItem[] = [
  { label: '지하철', value: 'subway' },
  { label: '버스', value: 'bus' },
  { label: '따릉이', value: 'bicycle' },
]

export const SUBWAY_GROUP_HEADER = {
  2: {
    from: '영등포구청',
    to: '당산',
  },
  9: {
    from: '선유도',
    to: '국회의사당',
  },
} as const

export const SUBWAY_BUBBLES: BubbleItem[] = [
  { label: '전체', value: 'all' },
  { label: '2호선', value: '2' },
  { label: '9호선', value: '9' },
]
