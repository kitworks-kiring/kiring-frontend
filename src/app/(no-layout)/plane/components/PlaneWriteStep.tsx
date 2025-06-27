import { PlaneStep, PlaneWriteStepProps } from '@/app/types/plane'
import clsx from 'clsx'

export default function PlaneWriteStep({
  message,
  setMessage,
  setStep,
  isValid,
  textareaRef,
  animStates,
}: PlaneWriteStepProps) {
  return (
    <div className="pt-33">
      <div
        className={clsx(
          'mb-5 text-left transition-all duration-500',
          animStates.showTextarea ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
      >
        <p className="body3 text-gray-800">
          하루에 한 번, 랜덤한 동료에게 종이비행기를 보낼 수 있어요.
        </p>
        <p className="body4 mt-1 text-purple-500">가볍게 안부를 전해보세요 ✉️</p>
      </div>
      <div
        className={clsx(
          'transition-all duration-500',
          animStates.showTextarea ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
      >
        <div className="relative">
          <textarea
            ref={textareaRef}
            placeholder="어떤 메시지를 보낼까요?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            maxLength={100}
            className="head4 h-70 w-full rounded-lg border p-4 pb-8 font-normal focus:border-gray-300 focus:ring-0 focus:outline-none"
          />
          <div className="body2 absolute right-4 bottom-4 text-gray-400">
            {message.length} / 100
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'transition-all duration-500',
          animStates.showNextButton ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
      >
        <button
          className="mt-10 w-full rounded-lg bg-purple-500 py-4 text-white disabled:bg-gray-300"
          disabled={!isValid}
          onClick={() => setStep(PlaneStep.CONFIRM)}
        >
          다음
        </button>
      </div>
    </div>
  )
}
