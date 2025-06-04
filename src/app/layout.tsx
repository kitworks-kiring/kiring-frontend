import type { Metadata } from 'next'
import Script from 'next/script'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kiring',
  description: '회사 생활의 연결고리, 키링',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-dvh">
      <head>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services,clusterer`}
          strategy="beforeInteractive"
        />
      </head>
      <body className="h-dvh overflow-hidden bg-gray-100">
        <Providers>
          <div className="full-width mx-auto flex h-full flex-col bg-white">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
