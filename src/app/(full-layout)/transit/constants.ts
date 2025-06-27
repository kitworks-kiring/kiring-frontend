import { TabItem } from '@/components/tabs/DefaultTab'

// 탭 목록
export const TRANSIT_TABS: TabItem[] = [
  { label: '지하철', value: 'subway' },
  { label: '버스', value: 'bus' },
  { label: '따릉이', value: 'bicycle' },
]

// 지하철 호선별 방면
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

// 버스 타입 헤더
export const BUS_TYPE_NAME: Record<string, { name: string; color: string }> = {
  1: {
    name: '일반',
    color: 'bg-[#87C700]',
  },
  2: {
    name: '간선/좌석',
    color: 'bg-[#386DE8]',
  },
  3: {
    name: '지선',
    color: 'bg-[#3CC344]',
  },
  4: {
    name: '직행/광역',
    color: 'bg-[#FB5852]',
  },
  5: {
    name: '공항',
    color: 'bg-[#65A6D2]',
  },
}

// 버스 타입별 색상 목록
export const BUS_TYPE_COLOR: Record<string, string> = {
  1: 'bg-[#65A6D2]', // 공항
  2: 'bg-[#87C700]', // 마을
  3: 'bg-[#386DE8]', // 간선
  4: 'bg-[#3CC344]', // 지선
  5: 'bg-[#87C700]', // 순환
  6: 'bg-[#FB5852]', // 광역
  7: 'bg-[#FB5852]', // 인천
  8: 'bg-[#FB5852]', // 경기
  9: 'bg-gray-400', // 폐지
  0: 'bg-[#87C700]', // 공용
}

// 버스 혼잡도 컬러 매핑
export const CONGESTION_COLOR: Record<string, string> = {
  blue: 'border-system-blue text-system-blue',
  green: 'border-system-green text-system-green',
  red: 'border-system-red text-system-red',
  gray: 'border-gray-600 text-gray-600',
}
