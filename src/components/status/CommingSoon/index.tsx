import Image from 'next/image'
import CommingSoonImage from '@/assets/comming-soon.png'

export default function CommingSoon() {
  return (
    <div className="flex-col-center h-full gap-10">
      <Image src={CommingSoonImage} alt="404 일러스트" width={440} height={440} />
      <p className="head3 text-center">
        현재 페이지는 <span className="text-purple-500">서비스 준비 중 </span>
        이에요
        <br />
        <span className="text-purple-500">새로운 기능</span>
        으로 곧 찾아올게요!
      </p>
    </div>
  )
}
