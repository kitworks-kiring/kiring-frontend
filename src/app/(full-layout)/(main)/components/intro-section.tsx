import DefaultKiring from '@/assets/intro-kiring.svg'

export default function IntroSection() {
  return (
    <section className="full-width relative bg-gradient-to-b from-white from-[-10%] to-purple-100 px-4 py-3">
      <div className="full-width flex h-16 rounded-2xl bg-white"></div>
      <div className="mx-auto flex h-full max-w-[390px] items-center justify-between">
        <span className="head3 text-basic-black">
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
      </div>
    </section>
  )
}
