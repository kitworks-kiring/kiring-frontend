import Header from '@/components/layout/Header'

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="default-layout header-pd">{children}</main>
    </>
  )
}
