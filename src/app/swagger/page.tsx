'use client'

import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'
import LoadingSpinner from '@/components/LoadingSpinner'

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

export default function Swagger() {
  return <SwaggerUI url="/api/swagger-json" />
}
