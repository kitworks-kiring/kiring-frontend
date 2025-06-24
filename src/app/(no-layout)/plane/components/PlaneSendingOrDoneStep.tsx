import SmCloud from '@/assets/plane/sm-cloud.svg'
import MdCloud from '@/assets/plane/md-cloud.svg'
import LgCloud from '@/assets/plane/lg-cloud.svg'
import LetterPlane from '@/assets/plane/letter-plane.svg'
import Complete from '@/assets/plane/complete.svg'
import clsx from 'clsx'
import { PlaneSendingOrDoneStepProps, PlaneStep } from '@/app/(header-layout)/mypage/types/plane'

export default function PlaneSendingOrDoneStep({
  step,
  recommendation,
  animStates,
  router,
}: PlaneSendingOrDoneStepProps) {
  const bgElementStyle = 'float-up-and-down absolute'

  return (
    <div className="absolute inset-0 flex flex-col items-center bg-white text-center">
      <SmCloud className={clsx('right-15 bottom-160 z-1', bgElementStyle)} />
      <MdCloud className={clsx('bottom-130 -left-10 z-2', bgElementStyle)} />
      <LgCloud className={clsx('-right-15 bottom-95 z-3', bgElementStyle)} />

      <LetterPlane
        className={clsx(
          'absolute bottom-100 z-3 transition-transform duration-1000 ease-in-out',
          step === PlaneStep.SENDING ? 'animate-plane-flight' : 'float-down-and-up',
        )}
      />

      {step === PlaneStep.DONE && (
        <Complete className="animate-complete-show absolute right-30 bottom-140 z-5" />
      )}

      <div className="head3 absolute bottom-55 w-full">
        <p>
          <span className="text-purple-500">{recommendation?.name}</span>님에게
        </p>
        <p
          className={clsx(
            'absolute left-1/2 mt-2 w-full -translate-x-1/2 transition-all duration-500',
            animStates.showSendingText ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          종이비행기를 보내는 중이에요...
        </p>
        <p
          className={clsx(
            'absolute left-1/2 mt-2 w-full -translate-x-1/2 transition-all duration-500',
            animStates.showDoneText ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          따뜻한 편지가 전해졌어요 💌
        </p>
      </div>

      {step === PlaneStep.DONE && (
        <div
          className={clsx(
            'absolute bottom-10 left-0 w-full px-4 transition-all duration-500',
            animStates.showHomeBtn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          <div className="mx-auto flex max-w-md flex-col gap-4">
            <button
              onClick={() => router.push('/')}
              className="rounded-lg bg-purple-500 p-4 text-white"
            >
              홈으로
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
