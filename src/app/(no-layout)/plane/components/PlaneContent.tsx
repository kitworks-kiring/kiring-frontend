'use client'

import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/login'
import { useUserStore } from '@/stores/user'
import { getPlaneTodayMessage, postPlaneSendMessage } from '@/services/plane'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/Header'
import PlaneWriteStep from '@/app/(no-layout)/plane/components/PlaneWriteStep'
import PlaneConfirmStep from '@/app/(no-layout)/plane/components/PlaneConfirmStep'
import PlaneSendingOrDoneStep from '@/app/(no-layout)/plane/components/PlaneSendingOrDoneStep'
import PlaneProfile from '@/app/(no-layout)/plane/components/PlaneProfile'
import { PlaneTodayMessage } from '@/app/(header-layout)/mypage/types/plane'

export default function SendPlanePage() {
  const { isLogin } = useAuthStore()
  const { user } = useUserStore()
  const router = useRouter()
  const queryClient = useQueryClient()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const [step, setStep] = useState<'write' | 'confirm' | 'sending' | 'done'>('write')
  const [message, setMessage] = useState('')
  const [animStates, setAnimStates] = useState({
    showRewriteBtn: false,
    showSubmitBtn: false,
    showTextarea: false,
    showNextButton: false,
    showSendingText: false,
    showDoneText: false,
    showHomeBtn: false,
  })

  const { data } = useQuery<PlaneTodayMessage>({
    queryKey: ['planeTodayMessage'],
    queryFn: getPlaneTodayMessage,
    enabled: isLogin,
  })
  const recommendation = data?.todayRecommendation
  const isValid = message.trim().length > 0 && message.length <= 100

  const mutation = useMutation({
    mutationFn: postPlaneSendMessage,
    onSuccess: async () => {
      await new Promise((r) => setTimeout(r, 3000))
      queryClient.invalidateQueries({ queryKey: ['planeMessages'] })
      setStep('done')
    },
    onError: () => {
      alert('메시지 전송에 실패했습니다. 다시 시도해주세요.')
      setStep('confirm')
    },
  })

  useEffect(() => {
    const resetAll = () => {
      setAnimStates({
        showRewriteBtn: false,
        showSubmitBtn: false,
        showTextarea: false,
        showNextButton: false,
        showSendingText: false,
        showDoneText: false,
        showHomeBtn: false,
      })
    }

    const planMap: Record<typeof step, { key: keyof typeof animStates; delay: number }[]> = {
      write: [
        { key: 'showNextButton', delay: 100 },
        { key: 'showTextarea', delay: 200 },
      ],
      confirm: [
        { key: 'showSubmitBtn', delay: 100 },
        { key: 'showRewriteBtn', delay: 200 },
      ],
      sending: [
        { key: 'showSendingText', delay: 100 },
        { key: 'showDoneText', delay: -1 }, // false 처리용 (아래에서 따로 제거)
      ],
      done: [
        { key: 'showSendingText', delay: -1 }, // false 처리용
        { key: 'showDoneText', delay: 400 },
        { key: 'showHomeBtn', delay: 500 },
      ],
    }

    resetAll()

    const plan = planMap[step]
    plan.forEach(({ key, delay }) => {
      if (delay === -1) {
        setTimeout(() => {
          setAnimStates((prev) => ({ ...prev, [key]: false }))
        }, 100) // false 처리도 딜레이 줄 수 있음
      } else {
        setTimeout(() => {
          setAnimStates((prev) => ({ ...prev, [key]: true }))
        }, delay)
      }
    })

    if (step === 'write' && textareaRef.current) {
      const len = textareaRef.current.value.length
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(len, len)
    }
  }, [step])

  const handleSubmit = () => {
    if (!recommendation || !user) return
    setStep('sending')
    mutation.mutate({
      senderId: user.id,
      receiverId: recommendation.id,
      message,
    })
  }

  return (
    <>
      {(step === 'write' || step === 'confirm') && <Header />}
      <section className="relative min-h-screen w-full overflow-hidden bg-white px-4 pt-6">
        <PlaneProfile step={step} recommendation={recommendation} />
        {step === 'write' && (
          <PlaneWriteStep
            message={message}
            setMessage={setMessage}
            setStep={setStep}
            isValid={isValid}
            textareaRef={textareaRef}
            animStates={animStates}
          />
        )}
        {step === 'confirm' && (
          <PlaneConfirmStep setStep={setStep} handleSubmit={handleSubmit} animStates={animStates} />
        )}
        {(step === 'sending' || step === 'done') && (
          <PlaneSendingOrDoneStep
            step={step}
            recommendation={recommendation}
            animStates={animStates}
            router={router}
          />
        )}
      </section>
    </>
  )
}
