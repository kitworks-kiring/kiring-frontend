import { PlaneProfileProps, PlaneStep } from '@/app/(header-layout)/mypage/types/plane'
import clsx from 'clsx'
import Image from 'next/image'

export default function PlaneProfile({ step, recommendation }: PlaneProfileProps) {
  if (step === PlaneStep.SENDING || step === PlaneStep.DONE || !recommendation) return null

  const isWriteStep = step === PlaneStep.WRITE

  return (
    <div
      className={clsx(
        'absolute left-1/2 z-10 flex -translate-x-1/2 items-center transition-all duration-500',
        isWriteStep
          ? 'top-23 left-26 flex-row gap-3'
          : 'top-3/10 w-full -translate-x-1/2 flex-col gap-3 p-4',
      )}
    >
      <Image
        //TODO : default 이미지 수정
        src={recommendation.profileImageUrl || '/default/avatar.png'}
        className="rounded-full border transition-all duration-500"
        alt={`${recommendation.name} 프로필`}
        width={isWriteStep ? 52 : 80}
        height={isWriteStep ? 52 : 80}
      />
      <p
        className={clsx('', isWriteStep ? 'head4 text-black' : 'head3 text-center text-purple-600')}
      >
        {recommendation.name} <span className="text-black">님에게</span>
        <span className={clsx('text-black', isWriteStep ? 'hidden' : 'block')}>
          종이비행기를 보낼까요?
        </span>
      </p>
    </div>
  )
}
