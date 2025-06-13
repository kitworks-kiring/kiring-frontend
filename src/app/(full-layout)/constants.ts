import { Team } from '@/app/(full-layout)/(main)/types/member'
import { BubbleItem } from '@/components/tabs/BubbleTab'

// 팀 목록 데이터
export const TEAMS: Team[] = [
  { code: 'BE', name: '백엔드팀', id: 3 },
  { code: 'FE', name: '프론트팀', id: 4 },
  { code: 'MG', name: '경영팀', id: 1 },
  { code: 'PM', name: '기획팀', id: 2 },
]

export const MEMBERS_BUBBLES: BubbleItem[] = [
  { label: '전체', value: 'all' },
  { label: '백엔드팀', value: 'BE' },
  { label: '프론트팀', value: 'FE' },
  { label: '경영팀', value: 'MG' },
  { label: '기획팀', value: 'PM' },
]
