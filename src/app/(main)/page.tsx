import Image from 'next/image'
import DefaultKiring from '@/assets/intro-kiring.svg'

export default function Main() {
  return (
    <div className="bg-gray-gray-50 h-full w-full">
      <section className="flex h-[210px] justify-between">
        <span className="head3 mt-7 text-black">
          키링의
          <br />
          다양한 서비스를
          <br />
          <span className="text-system-purple">로그인</span> 후<br />
          만나보세요!
        </span>
        <DefaultKiring className="max-w-[189.5px] self-center" />
      </section>
      <section>추천 Section</section>
      <section>주간 일정 Section</section>
      <section>구성원 Section</section>
    </div>
  )
}
