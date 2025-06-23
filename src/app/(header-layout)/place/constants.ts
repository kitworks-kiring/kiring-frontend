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
    label: '전체',
    value: '전체',
  },
  {
    label: '점심',
    value: '점심',
  },
  {
    label: '저녁',
    value: '저녁',
  },
  {
    label: '카페',
    value: '카페',
  },
] as const

export const PLACE_SORT_DROPDOWN_LIST = [
  {
    label: '인기순',
    value: 'likeCount',
  },
  {
    label: '거리순',
    value: 'distance',
  },
  {
    label: '최신순',
    value: 'id',
  },
] as const

export const MARKER_IMG_URL =
  'https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/ico/ico-place-map-pin.svg'
export const LIKE_IMG_URL = 'https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/ico/ico-like.svg'
export const NOT_LIKE_BTN_IMG_URL =
  'https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/ico/ico-like-button.svg'
export const LIKED_BTN_IMG_URL =
  'https://pub-cf3b9667253a490495a16433a99bd7ca.r2.dev/ico/ico-liked-button.svg'
