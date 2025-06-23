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

  const { data } = useQuery<{ data: PlaneTodayMessage }>({
    queryKey: ['planeTodayMessage'],
    queryFn: async () => {
      const res = await getPlaneTodayMessage()
      return res.data
    },
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

  const handleConfirmStepAnimation = () => {
    if (step === 'confirm') {
      const timer1 = setTimeout(() => setShowRewriteBtn(true), 200)
      const timer2 = setTimeout(() => setShowSubmitBtn(true), 100)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      setShowRewriteBtn(false)
      setShowSubmitBtn(false)
      return undefined
    }
  }

  const handleWriteStepAnimation = () => {
    if (step === 'write') {
      const timer1 = setTimeout(() => setShowTextarea(true), 100)
      const timer2 = setTimeout(() => setShowNextButton(true), 200)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    } else {
      setShowTextarea(false)
      setShowNextButton(false)
      return undefined
    }
  }

  useEffect(() => {
    focusTextareaToEnd()
  }, [step])

  useEffect(() => {
    const cleanupConfirm = handleConfirmStepAnimation()
    return () => {
      if (cleanupConfirm) cleanupConfirm()
    }
  }, [step])

  useEffect(() => {
    const cleanupWrite = handleWriteStepAnimation()
    return () => {
      if (cleanupWrite) cleanupWrite()
    }
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

  const renderSendingStep = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
      <Image src="/plane-sending.gif" alt="보내는 중" width={160} height={160} />
      <p className="mt-6 text-lg text-gray-600">종이비행기를 보내는 중이에요...</p>
    </div>
  )

  const renderDoneStep = () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-center">
      <Image src="/plane-complete.png" alt="전송 완료" width={160} height={160} />
      <p className="head3 mt-6 text-purple-600">{recommendation?.name}님에게</p>
      <p className="mt-2 text-gray-600">따뜻한 편지가 전해졌어요 💌</p>

      <button
        className="flex-1 transform rounded-lg bg-purple-500 p-4 text-white transition-all duration-500"
        onClick={() => router.push('/')}
      >
        메인으로 가기
      </button>
    </div>
  )

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

  return (
    <>
      {(step === 'write' || step === 'confirm') && <Header />}
      <section className="relative min-h-screen w-full overflow-hidden bg-white px-4 pt-6">
        {renderProfileArea()}

        {step === 'write' && renderWriteStep()}

        {step === 'confirm' && renderConfirmStep()}

        {step === 'sending' && renderSendingStep()}

        {step === 'done' && renderDoneStep()}
      </section>
    </>
  )
}
