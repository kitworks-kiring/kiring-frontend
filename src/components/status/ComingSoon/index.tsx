import ComingSoonImage from '@/assets/status/coming-soon.svg'

export default function ComingSoon() {
  return (
    <div className="flex-col-center h-full gap-10">
      <ComingSoonImage className="-mt-10" />
      <p className="head4 text-center">
        <span className="text-purple-500">서비스 준비 중 </span>
        이에요
        <br />
        <span className="text-purple-500">새로운 기능</span>
        으로 곧 찾아올게요!
      </p>
    </div>
  )
}
