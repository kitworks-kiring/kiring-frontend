// 날짜 YY년 MM월 DD일 형식
export function formatKoreanDate(dateString: string): string {
  if (!dateString) return ''

  // MM-DD 형식
  if (dateString.length === 5) {
    const [month, day] = dateString.split('-')
    return `${month}월 ${day}일`
  }

  // YYYY-MM-DD 형식
  const date = new Date(dateString)
  const year = date.getFullYear().toString().slice(-2)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}년 ${month}월 ${day}일`
}

// 현재 시점으로 상대적 시간 (ex: 방금전, 2시간 전, 3일 전, 2개월 전, 2년 전)
export function formatRelativeTime(dateString: string): string {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()

  const diffTime = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))

  if (diffHours < 24) {
    if (diffHours < 0) return '방금 전'
    return `${diffHours}시간 전`
  }

  // 날짜 차이 계산 (시간은 무시)
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diffDays = Math.floor((nowOnly.getTime() - dateOnly.getTime()) / (1000 * 60 * 60 * 24))

  // 일 단위 (1-30일)
  if (diffDays < 31) return `${diffDays}일 전`

  // 월 단위 (1-11개월)
  const diffMonths = Math.floor(diffDays / 30)
  if (diffMonths < 12) return `${diffMonths}개월 전`

  // 년 단위
  const diffYears = Math.floor(diffMonths / 12)
  return `${diffYears}년 전`
}

// 기준 날짜로 부터 경과 기간 (1년 2개월 3일)
export function formatElapsedDate(dateString: string): string {
  if (!dateString) return ''

  const start = new Date(dateString)
  const now = new Date()

  const diffTime = now.getTime() - start.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  const years = Math.floor(diffDays / 365)
  const months = Math.floor((diffDays % 365) / 30)
  const days = diffDays % 30

  const parts = []
  if (years > 0) parts.push(`${years}년`)
  if (months > 0) parts.push(`${months}개월`)
  if (days > 0) parts.push(`${days}일`)

  return parts.length > 0 ? parts.join(' ') : '오늘'
}
