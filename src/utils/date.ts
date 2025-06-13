// 입사일로부터 오늘까지 얼마나 지났는지 계산
export function getElapsedPeriodFromJoinDate(joinDate: string): string {
  const start = new Date(joinDate)
  const now = new Date()

  const startYear = start.getFullYear()
  const startMonth = start.getMonth()
  const startDate = start.getDate()

  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()
  const nowDate = now.getDate()

  let yearDiff = nowYear - startYear
  let monthDiff = nowMonth - startMonth
  let dayDiff = nowDate - startDate

  // 날짜 차이가 음수일 경우: 한 달 빼고 일 수 더함
  if (dayDiff < 0) {
    monthDiff -= 1
    dayDiff += new Date(nowYear, nowMonth, 0).getDate()
  }

  // 월 차이가 음수일 경우: 1년 빼고 월 수 더함
  if (monthDiff < 0) {
    yearDiff -= 1
    monthDiff += 12
  }

  // 결과 문자열 조합
  const parts = []
  if (yearDiff > 0) parts.push(`${yearDiff}년`)
  if (monthDiff > 0) parts.push(`${monthDiff}개월`)
  if (dayDiff > 0) parts.push(`${dayDiff}일`)

  return parts.length > 0 ? parts.join(' ') : '오늘'
}
