'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import DefaultKiring from '@/assets/intro-kiring.svg'
import IcoPaperAirplane from '@/assets/ico-paper-airplane.svg'
import IcoReceivePaperAirplane from '@/assets/ico-receive-paper-airplane.svg'
import Popup from '@/app/(full-layout)/(main)/components/introSection/Popup'
import IntroKiringRing from '@/assets/intro-kiring-ring.svg'
import { useAuthStore } from '@/stores/login'
import '@/styles/animations/intro.css'
import { useUserStore } from '@/stores/user'
import Image from 'next/image'
import { formatElapsedDate } from '@/utils/date'
import { useQuery } from '@tanstack/react-query'
import { PlaneMessage, PlaneTodayMessage } from '@/app/types/plane'
import { getPlaneTodayMessage, getPlaneRead } from '@/services/plane'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

interface IntroSectionProps {
  visible?: boolean
  onClose?: () => void
}

export default function IntroSection({ visible = true, onClose }: IntroSectionProps) {
  const [showReadPlanePopup, setShowReadPlanePopup] = useState(false)
  const [showTodayPlanePopup, setShowTodayPlanePopup] = useState(false)
  const [todayPlanePopupClosed, setTodayPlanePopupClosed] = useState(false)

  const [isShaking, setIsShaking] = useState(false)
  const [closing, setClosing] = useState(false)
  const { user } = useUserStore()
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const today = dayjs().format('YYYY-MM-DD')

  const { data: todayPlane } = useQuery<PlaneTodayMessage>({
    queryKey: ['todayMainPlane'],
    queryFn: getPlaneTodayMessage,
    enabled: isLogin,
    refetchOnWindowFocus: false,
  })

  const { data: readPlane } = useQuery<PlaneMessage[]>({
    queryKey: ['readPlane'],
    queryFn: getPlaneRead,
    enabled: isLogin,
  })

  useEffect(() => {
    if (!isLogin) return
    const lastReceivePlaneClosed = localStorage.getItem('popupReceivePlaneClosedDate')
    const lastReceivedPlaneId = localStorage.getItem('popupLastReceivedPlaneId')
    const lastIntroClosed = localStorage.getItem('popupLastIntroClosedDate')

    // 1순위: 받은 비행기 팝업
    if (readPlane && readPlane.length > 0) {
      const latestPlaneId = String(readPlane[0].messageId)
      if (lastReceivePlaneClosed === today && lastReceivedPlaneId === latestPlaneId) {
        setShowReadPlanePopup(false)
      } else {
        setShowReadPlanePopup(true)
        setShowTodayPlanePopup(false)
        return
      }
    }

    // 2순위: 보내는 팝업 (리시브 팝업이 안 뜨는 경우만)
    if (todayPlane && !todayPlanePopupClosed && todayPlane.todaySentCount === 0) {
      if (lastIntroClosed !== today) {
        setShowTodayPlanePopup(true)
      }
    }
  }, [isLogin, today, readPlane, todayPlane, todayPlanePopupClosed])

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

  const handleCloseReceivePlanePopup = () => {
    const latestPlaneId = readPlane && readPlane.length > 0 ? String(readPlane[0].messageId) : ''
    localStorage.setItem('popupReceivePlaneClosedDate', today)
    localStorage.setItem('popupLastReceivedPlaneId', latestPlaneId)
    setShowReadPlanePopup(false)
  }

  const handleCloseTodayPlanePopup = () => {
    localStorage.setItem('popupLastIntroClosedDate', today)
    setShowTodayPlanePopup(false)
    setTodayPlanePopupClosed(true)
  }

  return (
    <section
      className={clsx(
        'full-width relative min-h-[200px] bg-gradient-to-b from-white from-[-20%] to-purple-100 py-3 transition-all duration-300 ease-in-out',
        closing ? 'pointer-events-none -translate-y-6 opacity-0' : 'translate-y-0 opacity-100',
      )}
    >
      {isLogin && showReadPlanePopup && (
        <div className="mb-3 px-4">
          <Popup
            page="main"
            onClick={() => {
              router.push('/profile')
              handleCloseReceivePlanePopup()
            }}
            Ico={<IcoReceivePaperAirplane />}
            title={
              <span className="body4-sb text-gray-800">
                띵동! 오늘의 랜덤 종이비행기가 도착했어요
              </span>
            }
            description={<span className="body5 text-purple-500">누굴까? 지금 확인해보세요</span>}
          />
        </div>
      )}
      {isLogin && !showReadPlanePopup && showTodayPlanePopup && (
        <div className="mb-3 px-4">
          <Popup
            onClick={() => {
              router.push('/plane')
              if (todayPlane?.todaySentCount && todayPlane.todaySentCount > 0) {
                handleCloseTodayPlanePopup()
              }
            }}
            page="main"
            Ico={<IcoPaperAirplane />}
            title={
              <span className="body4-sb text-gray-800">
                오늘은{' '}
                <span className="text-purple-500">{todayPlane?.todayRecommendation.name}</span>
                님에게 비행기를 보낼 수 있어요!
              </span>
            }
            description={
              <span className="body5 text-purple-500">하루 한 번, 랜덤 종이비행기 보내기</span>
            }
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
              <div className="flex-row-center relative h-[190px] w-[190px]">
                <Image
                  src={user?.kiringImageUrl}
                  alt="intro-kiring"
                  width={150}
                  height={150}
                  className={`mt-5 w-[150px] ${isShaking && 'custom-shake'}`}
                />
              </div>
            )
          ) : (
            <DefaultKiring className={`mt-5 w-full ${isShaking && 'custom-shake'}`} />
          )}
        </div>
      </div>
    </section>
  )
}
