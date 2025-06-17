import { planeMessages } from '@/app/(header-layout)/mypage/constants'
import PlaneMessageCard from '@/app/(header-layout)/mypage/components/plane/PlaneMessageCard'

export default function PlaneSection() {
  return (
    <section className="container">
      <div className="head5 px-4">
        <p className="text-black">내가 받은 종이비행기</p>
      </div>

      <div className="scroll-hidden mt-4 flex gap-4 overflow-x-scroll px-4">
        <ul className="flex gap-4">
          {planeMessages.map((plane) => (
            <PlaneMessageCard key={plane?.messageId} plane={plane} />
          ))}
        </ul>
      </div>

      <div className="px-4">
        <button
          type="button"
          className="flex-row-center body4 mt-6 w-full gap-3 rounded-xl border border-black px-4 py-4 text-black"
        >
          종이비행기 {planeMessages.length}개 모두 보기
        </button>
      </div>
    </section>
  )
}
