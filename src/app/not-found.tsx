import Link from 'next/link'
import Image from 'next/image'
import NotFoundImage from '@/assets/status/not-found.png'

export default function NotFound() {
  return (
    <main className="default-layout flex flex-col justify-around py-10">
      <div>
        <Image src={NotFoundImage} alt="404 일러스트" width={440} height={300} />
        <p className="head3 text-center">
          찾고 계신{' '}
          <span className="text-purple-500">
            페이지가
            <br />
            하늘 어딘가로{' '}
          </span>
          날아가버렸어요
        </p>
      </div>
      <Link
        href="/"
        className="body2 left-4 mx-4 rounded-xl bg-purple-500 py-5 text-center text-white"
      >
        홈으로 가기
      </Link>
    </main>
  )
}
