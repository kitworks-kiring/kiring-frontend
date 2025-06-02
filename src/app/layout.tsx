import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kiring',
  description: '회사 생활의 연결고리, 키링',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-dvh">
      <body className="h-dvh overflow-hidden bg-gray-100">
        <Providers>
          <div className="full-width mx-auto flex h-full flex-col bg-white">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
