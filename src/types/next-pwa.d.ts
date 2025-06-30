// src/types/next-pwa.d.ts
declare module 'next-pwa' {
  import { NextConfig } from 'next'

  interface PWAConfig {
    dest?: string
    register?: boolean
    skipWaiting?: boolean
    disable?: boolean
    sw?: string
    runtimeCaching?: Array<{
      urlPattern: RegExp | string
      handler: string
      options?: Record<string, unknown>
    }>
    buildExcludes?: RegExp[]
    fallbacks?: Record<string, string>
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig
  export default withPWA
}
