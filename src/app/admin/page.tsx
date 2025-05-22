'use client'

import { getTeamLength } from '@/lib/api/team'

export default function Admin() {
  const btnCommonStyle = 'rounded-md p-4 text-white'

  const getHealthCheck = async () => {
    try {
      const res = await fetch('/api/health')
      if (!res.ok) {
        throw new Error('헬스체크 실패')
      }
      const data = await res.json()
      console.table(data)
    } catch (error) {
      console.error('Error fetching health check:', error)
    }
  }

  const getApiTest = async () => {
    const [res, err] = await getTeamLength()
    if (err) {
      console.error('Error fetching team length:', err)
      return
    }
    alert(`team count: ${res?.data?.count || 0}`)
  }

  return (
    <section className="flex-col-center h-full gap-4">
      <button
        type="button"
        onClick={getHealthCheck}
        className={`${btnCommonStyle} bg-system-green`}
      >
        health check
      </button>
      <button type="button" onClick={getApiTest} className={`${btnCommonStyle} bg-system-blue`}>
        api test
      </button>
    </section>
  )
}
