import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import LoginPage from '@/app/(no-layout)/(auth)/login/components/LoginPage'

export default function MyPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginPage />
    </Suspense>
  )
}
