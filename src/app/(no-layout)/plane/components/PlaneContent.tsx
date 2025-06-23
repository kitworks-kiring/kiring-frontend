'use client'

import { useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/login'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import { getPlaneTodayMessage, postPlaneSendMessage } from '@/services/plane'
import { useUserStore } from '@/stores/user'
import { PlaneTodayMessage } from '@/app/(header-layout)/mypage/types/plane'
import SmCloud from '@/assets/plane/sm-cloud.svg'
import MdCloud from '@/assets/plane/md-cloud.svg'
import LgCloud from '@/assets/plane/lg-cloud.svg'
import LetterPlane from '@/assets/plane/letter-plane.svg'
import Complete from '@/assets/plane/complete.svg'

export default function SendPlanePage() {
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user } = useUserStore()

  const [step, setStep] = useState<'write' | 'confirm' | 'sending' | 'done'>('write')
  const [message, setMessage] = useState('')
  const [showRewriteBtn, setShowRewriteBtn] = useState(false)
  const [showSubmitBtn, setShowSubmitBtn] = useState(false)
  const [showTextarea, setShowTextarea] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const { data } = useQuery<PlaneTodayMessage>({
    queryKey: ['planeTodayMessage'],
    queryFn: getPlaneTodayMessage,
    enabled: isLogin,
  })

  const recommendation = data?.todayRecommendation
  const isValid = message.trim().length > 0 && message.length <= 100
  const isWriteStep = step === 'write'

  const mutation = useMutation({
    mutationFn: postPlaneSendMessage,
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      queryClient.invalidateQueries({ queryKey: ['planeMessages'] })
      setStep('done')
    },
    onError: () => {
      alert('메시지 전송에 실패했습니다. 다시 시도해주세요.')
      setStep('confirm')
    },
  })

  const focusTextareaToEnd = () => {
    if (step === 'write') {
      const textarea = textareaRef.current
      if (textarea) {
        textarea.focus()
        const length = textarea.value.length
        textarea.setSelectionRange(length, length)
      }
    }
  }

  const handleStepAnimation = (
    condition: boolean,
    actions: [() => void, () => void],
    delays: [number, number],
    resets: [() => void, () => void],
  ) => {
    if (condition) {
      const timer1 = setTimeout(actions[0], delays[0])
      const timer2 = setTimeout(actions[1], delays[1])
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      resets[0]()
      resets[1]()
      return undefined
    }
  }

  const statusStyle = 'float-down-and-up position-centered-x position-centered-y absolute z-1'
  const bgElementStyle = 'float-up-and-down absolute'
  const textStyle = 'effect-name fade-name head3 text-center leading-8 -mt-5'

  useEffect(() => {
    focusTextareaToEnd()
  }, [step])

  useEffect(() => {
    const cleanupConfirm = handleStepAnimation(
      step === 'confirm',
      [() => setShowSubmitBtn(true), () => setShowRewriteBtn(true)],
      [100, 200],
      [() => setShowSubmitBtn(false), () => setShowRewriteBtn(false)],
    )
    return () => cleanupConfirm?.()
  }, [step])

  useEffect(() => {
    const cleanupWrite = handleStepAnimation(
      step === 'write',
      [() => setShowTextarea(true), () => setShowNextButton(true)],
      [100, 200],
      [() => setShowTextarea(false), () => setShowNextButton(false)],
    )
    return () => cleanupWrite?.()
  }, [step])

  const handleSubmit = () => {
    if (!recommendation || !user) return
    setStep('sending')
    mutation.mutate({
      senderId: user.id, // 실제 로그인 유저 ID로 교체
      receiverId: recommendation.id,
      message,
    })
  }

  const renderProfileArea = () => {
    if (step === 'sending' || step === 'done' || !recommendation) return null

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
          src={recommendation.profileImageUrl || '/default/avatar.png'}
          className="rounded-full border transition-all duration-500"
          alt={`${recommendation.name} 프로필`}
          width={isWriteStep ? 52 : 80}
          height={isWriteStep ? 52 : 80}
        />
        <p
          className={clsx(
            '',
            isWriteStep ? 'head4 text-black' : 'head3 text-center text-purple-600',
          )}
        >
          {recommendation.name} <span className="text-black">님에게</span>
          <span className={clsx('text-black', isWriteStep ? 'hidden' : 'block')}>
            종이비행기를 보낼까요?
          </span>
        </p>
      </div>
    )
  }

  const renderWriteStep = () => (
    <div className="pt-33">
      <div
        className={clsx(
          'transition-all duration-500',
          showTextarea ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
      >
        <div className="relative">
          <textarea
            ref={textareaRef}
            placeholder="어떤 메시지를 보낼까요?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.preventDefault()
            }}
            maxLength={100}
            className="head4 h-80 w-full rounded-lg border p-4 pb-8 font-normal focus:border-gray-300 focus:ring-0 focus:outline-none"
          />
          <div className="body2 absolute right-4 bottom-4 text-gray-400">
            {message.length} / 100
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'transition-all duration-500',
          showNextButton ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
      >
        <button
          className="mt-10 w-full rounded-lg bg-purple-500 py-4 text-white disabled:bg-gray-300"
          disabled={!isValid}
          onClick={() => setStep('confirm')}
        >
          다음
        </button>
      </div>
    </div>
  )

  const renderConfirmStep = () => (
    <div className="absolute bottom-10 left-0 w-full px-4">
      <div className="mx-auto flex max-w-md flex-col gap-4">
        <button
          onClick={() => setStep('write')}
          className={clsx(
            'rounded-lg border border-purple-500 p-4 text-purple-500 transition-all duration-300',
            showRewriteBtn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          다시쓰기
        </button>
        <button
          onClick={handleSubmit}
          className={clsx(
            'rounded-lg bg-purple-500 p-4 text-white transition-all duration-500',
            showSubmitBtn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
        >
          보내기
        </button>
      </div>
    </div>
  )

  const renderSendingOrDoneStep = () => (
    <div className="absolute inset-0 flex flex-col items-center bg-white text-center">
      {/* 공통 구름 */}
      <SmCloud className={clsx('right-15 bottom-160 z-1', bgElementStyle)} />
      <MdCloud className={clsx('bottom-130 -left-10 z-2', bgElementStyle)} />
      <LgCloud className={clsx('-right-15 bottom-95 z-3', bgElementStyle)} />

      {/* 비행기 */}
      <LetterPlane
        className={clsx(
          'absolute bottom-100 z-3 transition-transform duration-1000 ease-in-out',
          step === 'sending' ? 'animate-plane-flight' : 'float-down-and-up',
        )}
      />

      {/* 완료 애니메이션 요소 */}
      {step === 'done' && (
        <Complete
          className={clsx(
            'animate-complete-show float-down-and-up absolute right-27 bottom-142 z-5',
          )}
        />
      )}

      {/* 텍스트 메시지 */}
      <div className="absolute bottom-55">
        <p className="head3 mt-6 text-purple-600">{recommendation?.name}님에게</p>
        <p className="mt-2 text-gray-600">
          {step === 'sending' ? '종이비행기를 보내는 중이에요...' : '따뜻한 편지가 전해졌어요 💌'}
        </p>
      </div>

      {/* 홈으로 버튼 */}
      {step === 'done' && (
        <div className="absolute bottom-10 left-0 w-full px-4">
          <div className="mx-auto flex max-w-md flex-col gap-4">
            <button
              onClick={() => router.push('/')}
              className="rounded-lg bg-purple-500 p-4 text-white transition-all duration-500"
            >
              홈으로
            </button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {(step === 'write' || step === 'confirm') && <Header />}
      <section className="relative min-h-screen w-full overflow-hidden bg-white px-4 pt-6">
        {renderProfileArea()}

        {step === 'write' && renderWriteStep()}

        {step === 'confirm' && renderConfirmStep()}

        {(step === 'sending' || step === 'done') && renderSendingOrDoneStep()}
      </section>
    </>
  )
}
