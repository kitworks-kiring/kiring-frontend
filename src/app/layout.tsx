import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Kiring',
  description: '회사 생활의 연결고리, 키링',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="h-full overflow-hidden bg-gray-100">
        <Providers>
          <div className="mx-auto flex h-full w-full max-w-150 flex-col bg-white">
            <Header />
            <main className="min-h-screen grow overflow-y-auto pt-14 pb-18">{children}</main>
            <Navigation />
          </div>
        </Providers>
      </body>
    </html>
  )
}
