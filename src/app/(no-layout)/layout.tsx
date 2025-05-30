export default function NoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="default-layout">{children}</main>
    </>
  )
}
