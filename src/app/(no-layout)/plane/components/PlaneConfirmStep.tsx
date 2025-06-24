import { PlaneConfirmStepProps, PlaneStep } from '@/app/types/plane'
import clsx from 'clsx'

export default function PlaneConfirmStep({
  setStep,
  handleSubmit,
  animStates,
}: PlaneConfirmStepProps) {
  return (
    <div className="absolute bottom-10 left-0 w-full px-4">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <button
          onClick={() => setStep(PlaneStep.WRITE)}
          className={clsx(
            'rounded-lg border border-purple-500 p-4 text-purple-500 transition-all duration-300',
            animStates.showRewriteBtn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          다시쓰기
        </button>
        <button
          onClick={handleSubmit}
          className={clsx(
            'rounded-lg bg-purple-500 p-4 text-white transition-all duration-500',
            animStates.showSubmitBtn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          보내기
        </button>
      </div>
    </div>
  )
}
