'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/login'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MemberMeType } from '@/app/types/memberType'
import { getMemberById } from '@/services/member'

export default function SendPlanePage() {
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const [step, setStep] = useState<'write' | 'confirm'>('write')
  const [message, setMessage] = useState('')

  const { data, isLoading } = useQuery<{ member: MemberMeType }>({
    queryKey: ['tempTestMember'],
    queryFn: () => getMemberById(8),
    enabled: isLogin,
  })

  const recommendation = data?.member
  const isValid = message.trim().length > 0 && message.length <= 200

  const handleSubmit = () => {
    if (!recommendation) return
    router.push(`/plane/sending?to=${recommendation.id}&message=${encodeURIComponent(message)}`)
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-4 pt-6">
      {/* 공통 프로필 영역 */}
      <div
        className={clsx(
          'absolute left-1/2 z-10 flex -translate-x-1/2 items-center transition-all duration-700',
          step === 'write'
            ? 'top-23 left-24 flex-row gap-3 text-black'
            : 'top-1/3 flex-col text-purple-600',
        )}
      >
        {recommendation && (
          <>
            <Image
              src={recommendation.profileImageUrl || '/default/avatar.png'}
              className="rounded-full border"
              alt={`${recommendation.name} 프로필`}
              width={step === 'write' ? 52 : 80}
              height={step === 'write' ? 52 : 80}
            />
            <p className="text-lg font-semibold">{recommendation.name} 님에게</p>
          </>
        )}
      </div>

      {/* 작성 화면 */}
      <div
        className={clsx(
          'pt-33 transition-all duration-500',
          step === 'write'
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        <textarea
          placeholder="어떤 메시지를 보낼까요?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={200}
          className="h-50 w-full rounded-lg border p-4"
        />
        <div className="text-right text-sm text-gray-400">{message.length} / 200</div>
        <button
          className="mt-6 w-full rounded-lg bg-purple-500 py-4 text-white disabled:bg-gray-300"
          disabled={!isValid}
          onClick={() => setStep('confirm')}
        >
          다음
        </button>
      </div>

      {/* 확인 화면 */}
      <div
        className={clsx(
          'absolute top-0 left-0 flex h-full w-full flex-col items-center px-4 pt-56 text-center transition-all duration-700',
          step === 'confirm'
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0',
        )}
      >
        {recommendation && (
          <>
            <div
              className={clsx(
                'animate-fadeUpBtn fixed bottom-10 mt-10 flex w-full gap-4 opacity-0',
                step === 'confirm' && 'opacity-100',
              )}
            >
              <button
                onClick={() => setStep('write')}
                className="flex-1 rounded-lg border border-gray-400 py-3 text-gray-600"
              >
                다시쓰기
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-lg bg-purple-500 py-3 text-white"
              >
                보내기
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
