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
import { PlaneAnimStates, PlaneStep, PlaneTodayMessage } from '@/app/types/plane'

export default function SendPlanePage() {
  const { isLogin } = useAuthStore()
  const { user } = useUserStore()
  const router = useRouter()
  const queryClient = useQueryClient()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const [step, setStep] = useState<PlaneStep>(PlaneStep.WRITE)
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
      setStep(PlaneStep.DONE)
    },
    onError: () => {
      alert('메시지 전송에 실패했습니다. 다시 시도해주세요.')
      setStep(PlaneStep.CONFIRM)
    },
  })

  useEffect(() => {
    // clearTimeout 처리(메모리 누수 방지)
    const timeouts: NodeJS.Timeout[] = []
    const resetAll = () => {
      const initialState: PlaneAnimStates = {
        showRewriteBtn: false,
        showSubmitBtn: false,
        showTextarea: false,
        showNextButton: false,
        showSendingText: false,
        showDoneText: false,
        showHomeBtn: false,
      }
      setAnimStates(initialState)
    }

    const planMap: Record<PlaneStep, { key: keyof typeof animStates; delay: number }[]> = {
      [PlaneStep.WRITE]: [
        { key: 'showNextButton', delay: 100 },
        { key: 'showTextarea', delay: 200 },
      ],
      [PlaneStep.CONFIRM]: [
        { key: 'showSubmitBtn', delay: 100 },
        { key: 'showRewriteBtn', delay: 200 },
      ],
      [PlaneStep.SENDING]: [
        { key: 'showSendingText', delay: 100 },
        { key: 'showDoneText', delay: -1 },
      ],
      [PlaneStep.DONE]: [
        { key: 'showSendingText', delay: -1 },
        { key: 'showDoneText', delay: 400 },
        { key: 'showHomeBtn', delay: 500 },
      ],
    }

    resetAll()

    const plan = planMap[step]
    plan.forEach(({ key, delay }) => {
      if (delay === -1) {
        const timeout = setTimeout(() => {
          setAnimStates((prev) => ({ ...prev, [key]: false }))
        }, 100) // false 처리도 딜레이 줄 수 있음
        timeouts.push(timeout)
      } else {
        const timeout = setTimeout(() => {
          setAnimStates((prev) => ({ ...prev, [key]: true }))
        }, delay)
        timeouts.push(timeout)
      }
    })

    if (step === PlaneStep.WRITE && textareaRef.current) {
      const len = textareaRef.current.value.length
      textareaRef.current.focus()
      textareaRef.current.setSelectionRange(len, len)
    }

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [step])

  const handleSubmit = () => {
    if (!recommendation || !user) return
    setStep(PlaneStep.SENDING)
    mutation.mutate({
      senderId: user.id,
      receiverId: recommendation.id,
      message,
    })
  }

  return (
    <>
      {[PlaneStep.WRITE, PlaneStep.CONFIRM].includes(step) && <Header />}
      <section className="relative min-h-screen w-full overflow-hidden bg-white px-4 pt-6">
        <PlaneProfile step={step} recommendation={recommendation} />
        {step === PlaneStep.WRITE && (
          <PlaneWriteStep
            message={message}
            setMessage={setMessage}
            setStep={setStep}
            isValid={isValid}
            textareaRef={textareaRef}
            animStates={animStates}
          />
        )}
        {step === PlaneStep.CONFIRM && (
          <PlaneConfirmStep setStep={setStep} handleSubmit={handleSubmit} animStates={animStates} />
        )}
        {[PlaneStep.SENDING, PlaneStep.DONE].includes(step) && (
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
