import type { Metadata } from 'next'
import Script from 'next/script'
import { Providers } from './providers'
import { BeusableScript } from './analytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kiring',
  description: '회사 생활의 연결고리, 키링',
  openGraph: {
    title: 'Kiring',
    description: '회사 생활의 연결고리, 키링',
    url: 'https://kiring.vercel.app',
    siteName: 'Kiring',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kiring',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-dvh">
      <head>
        {/* pwa */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* font */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        {/* kakaomap */}
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer`}
          strategy="beforeInteractive"
        />
      </head>
      <body className="h-dvh overflow-hidden bg-gray-100">
        <Providers>
          <div className="full-width mx-auto flex h-full flex-col bg-white">{children}</div>
        </Providers>
        {/* analytics: </body> 태그 바로 앞에 위치해야 함 */}
        <BeusableScript />
      </body>
    </html>
  )
}
