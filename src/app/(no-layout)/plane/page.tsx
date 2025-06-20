'use client'

import { useEffect, useState } from 'react'
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
  const [step, setStep] = useState<'write' | 'confirm' | 'sending' | 'done'>('write')
  const [message, setMessage] = useState('')
  const [showRewriteBtn, setShowRewriteBtn] = useState(false)
  const [showSubmitBtn, setShowSubmitBtn] = useState(false)

  const { data } = useQuery<{ member: MemberMeType }>({
    queryKey: ['tempTestMember'],
    queryFn: () => getMemberById(8),
    enabled: isLogin,
  })

  const recommendation = data?.member
  const isValid = message.trim().length > 0 && message.length <= 100
  const isWriteStep = step === 'write'

  const handleSubmit = () => {
    if (!recommendation) return
    setStep('sending')
    setTimeout(() => {
      setStep('done')
    }, 2000)
  }

  useEffect(() => {
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
    }
  }, [step])

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-4 pt-6">
      {/* 공통 프로필 영역 */}
      {step !== 'sending' && step !== 'done' && recommendation && (
        <div
          className={clsx(
            'absolute left-1/2 z-10 flex -translate-x-1/2 items-center transition-all duration-500',
            isWriteStep
              ? 'top-23 left-24 flex-row gap-3'
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
      )}

      {/* 작성 화면 */}
      {step === 'write' && (
        <div className="pt-33 transition-all duration-300">
          <div className="relative">
            <textarea
              placeholder="어떤 메시지를 보낼까요?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.preventDefault()
              }}
              maxLength={100}
              className="head3 h-80 w-full rounded-lg border p-4 pb-8 focus:border-gray-300 focus:ring-0 focus:outline-none"
            />
            <div className="body2 absolute right-4 bottom-4 text-gray-400">
              {message.length} / 100
            </div>
          </div>
          <button
            className="mt-10 w-full rounded-lg bg-purple-500 py-4 text-white disabled:bg-gray-300"
            disabled={!isValid}
            onClick={() => setStep('confirm')}
          >
            다음
          </button>
        </div>
      )}

      {/* 확인 화면 */}
      {step === 'confirm' && recommendation && (
        <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center px-4 pt-56 text-center transition-all duration-300">
          <div className="fixed bottom-10 mt-10 flex w-full flex-col gap-4 px-4">
            <button
              onClick={() => setStep('write')}
              className={clsx(
                'flex-1 transform rounded-lg border border-purple-500 p-4 text-purple-500 transition-all duration-300',
                showRewriteBtn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
              )}
            >
              다시쓰기
            </button>
            <button
              onClick={handleSubmit}
              className={clsx(
                'flex-1 transform rounded-lg bg-purple-500 p-4 text-white transition-all duration-500',
                showSubmitBtn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
              )}
            >
              보내기
            </button>
          </div>
        </div>
      )}

      {/* 보내는 중 애니메이션 */}
      {step === 'sending' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
          <Image src="/plane-sending.gif" alt="보내는 중" width={160} height={160} />
          <p className="mt-6 text-lg text-gray-600">종이비행기를 보내는 중이에요...</p>
        </div>
      )}

      {/* 전송 완료 화면 */}
      {step === 'done' && recommendation && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-center">
          <Image src="/plane-complete.png" alt="전송 완료" width={160} height={160} />
          <p className="head3 mt-6 text-purple-600">{recommendation.name}님에게</p>
          <p className="mt-2 text-gray-600">따뜻한 편지가 전해졌어요 💌</p>

          <button
            className="flex-1 transform rounded-lg bg-purple-500 p-4 text-white transition-all duration-500"
            onClick={() => router.push('/')}
          >
            메인으로 가기
          </button>
        </div>
      )}
    </section>
  )
}
