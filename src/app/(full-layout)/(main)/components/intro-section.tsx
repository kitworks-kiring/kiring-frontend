import DefaultKiring from '@/assets/intro-kiring.svg'

export default function IntroSection() {
  return (
    <section className="flex h-[198px] max-w-[390px] justify-between pr-4 pl-[21px]">
      <span className="head3 text-basic-black mt-7">
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
  )
}
