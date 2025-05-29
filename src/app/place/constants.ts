export const PLACE_MAIN_TAB_LIST = [
  {
    label: '맛집',
    type: 'restaurant',
  },
  {
    label: '산책로',
    type: 'trail',
  },
] as const

export const PLACE_FILTER_TAB_LIST = [
  {
    label: '랜덤',
    type: 'random',
  },
  {
    label: '점심',
    type: 'lunch',
  },
  {
    label: '저녁',
    type: 'dinner',
  },
  {
    label: '카페',
    type: 'cafe',
  },
] as const

export const PLACE_SORT_DROPDOWN_LIST = [
  {
    label: '거리순',
    type: 'distance',
  },
  {
    label: '인기순',
    type: 'popular',
  },
  {
    label: '최신순',
    type: 'latest',
  },
] as const
