import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 네이버 이미지
      {
        protocol: 'https',
        hostname: '*.pstatic.net',
      },
      // 클라우드 플레어 R2 스토리지
      {
        protocol: 'https',
        hostname: 'pub-cf3b9667253a490495a16433a99bd7ca.r2.dev',
      },
    ],
    unoptimized: true,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig)
