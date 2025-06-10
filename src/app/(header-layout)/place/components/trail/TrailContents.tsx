import Navigation from '@/components/layout/Navigation'
import CommingSoon from '@/components/status/CommingSoon'

export default function TrailContents() {
  return (
    <section className="nav-pd h-full pt-9">
      <CommingSoon />
      <Navigation />
    </section>
  )
}
