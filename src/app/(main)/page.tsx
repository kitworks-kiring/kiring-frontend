import DefaultKiring from '@/assets/intro-kiring.svg'

export default function Main() {
  return (
    <div className="flex flex-col gap-3 bg-gray-50">
      {/* Intro Section */}
      <section className="flex h-[198px] justify-between pr-4 pl-[21px]">
        <span className="head3 mt-7 text-black">
          키링의
          <br />
          다양한 서비스를
          <br />
          <span className="text-system-purple">로그인</span> 후<br />
          만나보세요!
        </span>
        <div className="mt-[10px] h-full max-w-[190px] self-center">
          <DefaultKiring className="w-full" />
        </div>
      </section>

      {/* Recommend Section */}
      <section className="h-[285px] w-full bg-emerald-300">
        <div></div>
      </section>

      {/* Weekly Schedule Section */}
      <section className="h-[285px] w-full bg-blue-400">
        <div></div>
      </section>

      {/* Member Section */}
      <section className="h-[285px] w-full bg-amber-400">
        <div></div>
      </section>
    </div>
  )
}
