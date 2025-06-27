import Link from 'next/link'
import Status from '@/components/status/Status'

export default function ErrorPage() {
  return (
    <div className="flex h-full flex-col justify-around py-10">
      <Status statusCode="error" />
      <Link
        href="/"
        replace={true}
        className="body2 left-4 mx-4 rounded-xl bg-purple-500 py-5 text-center text-white"
      >
        홈으로 가기
      </Link>
    </div>
  )
}
