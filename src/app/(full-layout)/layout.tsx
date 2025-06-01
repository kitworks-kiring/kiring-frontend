import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'

export default function FullLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="default-layout header-pd nav-pd">{children}</main>
      <Navigation />
    </>
  )
}
