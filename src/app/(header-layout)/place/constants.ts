// styles
export const HEADER_MARGIN_TOP = '23'
export const MAP_HEIGHT_CALC = '[calc(100dvh-12.5rem)]'
export const CONTENT_TRANSLATE_Y = 'translate-y-[calc(100vh-8rem)]'
export const SHOW_MAP_BTN_BOTTOM = '25'

// tab list
export const PLACE_DEFAULT_TAB_LIST = [
  {
    label: '맛집',
    value: 'restaurant',
  },
  {
    label: '산책로',
    value: 'trail',
  },
] as const

export const PLACE_BUBBLE_TAB_LIST = [
  {
    label: '랜덤',
    value: 'random',
  },
  {
    label: '점심',
    value: 'lunch',
  },
  {
    label: '저녁',
    value: 'dinner',
  },
  {
    label: '카페',
    value: 'cafe',
  },
] as const

export const PLACE_SORT_DROPDOWN_LIST = [
  {
    label: '인기순',
    value: 'popular',
  },
  {
    label: '거리순',
    value: 'distance',
  },
  {
    label: '최신순',
    value: 'latest',
  },
] as const
