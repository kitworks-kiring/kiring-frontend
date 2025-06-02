'use client'

import { useEffect, useState } from 'react'

export default function HealthCheckPage() {
  const [data, setData] = useState<string | null>(null)
  const [status, setStatus] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`)
      .then((res) => {
        setStatus(res.status)
        return res.text()
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-4 text-sm text-gray-800">
      <h1 className="mb-2 text-lg font-semibold text-purple-500">kiring 서버 헬스 체크</h1>
      <div className="text-body4">
        {loading ? (
          <p className="text-system-gray">⏳ 요청 중입니다...</p>
        ) : error ? (
          <p className="text-system-red">❌ 에러: {error}</p>
        ) : status === 200 ? (
          <p className="text-system-green">✅ 정상 응답 (200 OK) {data}</p>
        ) : (
          <p className="text-system-yellow">⚠️ 응답 실패 (Status: {status})</p>
        )}
      </div>
    </div>
  )
}
