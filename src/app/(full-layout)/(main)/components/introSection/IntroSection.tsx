'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import DefaultKiring from '@/assets/intro-kiring.svg'
import IcoPaperAirplane from '@/assets/ico-paper-airplane.svg'
import Popup from '@/app/(full-layout)/(main)/components/introSection/Popup'
import IntroKiringRing from '@/assets/intro-kiring-ring.svg'
import { useAuthStore } from '@/stores/login'
import '@/styles/animations/intro.css'
import { useUserStore } from '@/stores/user'
import Image from 'next/image'
import { formatElapsedDate } from '@/utils/date'

interface IntroSectionProps {
  visible?: boolean
  onClose?: () => void
}

export default function IntroSection({ visible = true, onClose }: IntroSectionProps) {
  const [isPopup, setIsPopup] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [closing, setClosing] = useState(false)
  const { user } = useUserStore()
  const { isLogin } = useAuthStore()

  const today = dayjs().format('YYYY-MM-DD')

  useEffect(() => {
    const lastClosedDate = localStorage.getItem('popupLastClosedDate')

    if (lastClosedDate !== today) {
      setIsPopup(true)
      localStorage.removeItem('popupLastClosedDate')
    }
  }, [])

  useEffect(() => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }, [])

  useEffect(() => {
    if (!visible) {
      setClosing(true)
      setTimeout(() => {
        onClose?.()
      }, 300)
    }
  }, [visible, onClose])

  const handleClosePopup = () => {
    localStorage.setItem('popupLastClosedDate', today)
    setIsPopup(false)
  }

  return (
    <section
      className={`full-width relative bg-gradient-to-b from-white from-[-10%] to-purple-100 py-3 transition-all duration-300 ease-in-out ${closing ? 'pointer-events-none -translate-y-6 opacity-0' : 'translate-y-0 opacity-100'}`}
    >
      {isPopup && isLogin && (
        <div className="px-4">
          <Popup
            Ico={<IcoPaperAirplane />}
            title={
              <span className="body4-sb text-gray-800">
                오늘은 <span className="text-purple-500">{'백혜인'}</span>님에게 비행기를 보낼 수
                있어요!
              </span>
            }
            description={
              <span className="body5 text-purple-500">하루 한 번, 랜덤 종이 비행기 보내기</span>
            }
            onClose={handleClosePopup}
          />
        </div>
      )}
      <div className="full-width flex h-full max-w-[390px] items-center justify-between pr-[1%] pl-[7%]">
        {isLogin ? (
          <span className="head3 text-basic-black">
            키트웍스와
            <br />
            함께한지
            <br />
            {Array.isArray(formatElapsedDate(user?.joinedAt ?? '', true)) ? (
              (formatElapsedDate(user?.joinedAt ?? '', true) as string[]).map((part, index) => (
                <span key={index} className="text-system-purple">
                  {part}
                  <span className="text-basic-black">
                    {index == 0 && '년 '}
                    {index == 1 && '개월 '}
                    {index == 2 && '일'}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-system-purple">
                {formatElapsedDate(user?.joinedAt ?? '', true)}
              </span>
            )}
            <br /> 되었어요!
          </span>
        ) : (
          <span className="head3 text-basic-black">
            키링의
            <br />
            다양한 서비스를
            <br />
            <span className="text-system-purple">로그인</span> 후<br />
            만나보세요!
          </span>
        )}
        <div className="relative flex max-w-[190px] flex-col items-center">
          <IntroKiringRing className="absolute top-1 left-12" />
          {isLogin ? (
            user?.kiringImageUrl && (
              <Image
                src={user?.kiringImageUrl}
                alt="intro-kiring"
                width={190}
                height={190}
                className={`mt-5 w-full ${isShaking && 'custom-shake'}`}
              />
            )
          ) : (
            <DefaultKiring className={`mt-5 w-full ${isShaking && 'custom-shake'}`} />
          )}
        </div>
      </div>
    </section>
  )
}
