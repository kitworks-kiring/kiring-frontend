import Navigation from '@/components/layout/Navigation'
import ComingSoon from '@/components/status/ComingSoon'

export default function TrailContents() {
  return (
    <section className="nav-pd h-full pt-9">
      <ComingSoon />
      <Navigation />
    </section>
  )
}
