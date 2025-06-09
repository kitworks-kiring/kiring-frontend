import { Suspense } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import WelcomePage from '@/app/(no-layout)/(auth)/welcome/components/WelcomePage'

export default function Login() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <WelcomePage />
    </Suspense>
  )
}
