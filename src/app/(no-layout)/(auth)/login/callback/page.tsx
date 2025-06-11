import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import LoginCallbackPage from '@/app/(no-layout)/(auth)/login/callback/components/LoginCallbackPage'

export default function Login() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginCallbackPage />
    </Suspense>
  )
}
