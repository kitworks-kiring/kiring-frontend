'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { useAuthStore } from '@/stores/login'
import { useXScrollWheel } from '@/hooks/useXScrollWheel'
import { getPlaneRead, getPlaneTodayMessage } from '@/services/plane'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Popup from '@/app/(full-layout)/(main)/components/introSection/Popup'
import PlaneMessageCard from '@/app/(header-layout)/profile/components/plane/PlaneMessageCard'
import PlaneBottomSheet from '@/app/(header-layout)/profile/components/plane/PlaneBottomSheet'
import IcoPaperAirplane from '@/assets/ico-paper-airplane.svg'
import { PlaneMessage, PlaneTodayMessage } from '@/app/types/plane'

export default function PlaneSection() {
  const router = useRouter()
  const scrollRef = useXScrollWheel()
  const { isLogin } = useAuthStore()
  const [isPopup, setIsPopup] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const today = dayjs().format('YYYY-MM-DD')

  const { data: planeMessages = [], isLoading } = useQuery<PlaneMessage[]>({
    queryKey: ['planeRead'],
    queryFn: getPlaneRead,
    refetchOnWindowFocus: false,
    enabled: isLogin,
  })

  const { data: todayPlane } = useQuery<PlaneTodayMessage>({
    queryKey: ['todayPlane'],
    queryFn: getPlaneTodayMessage,
    enabled: isLogin,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (todayPlane?.todaySentCount !== undefined) {
      // 오늘 쪽지를 보냈으면 팝업 끄고, 안보냈으면 팝업 켜기
      if (todayPlane.todaySentCount > 0) {
        setIsPopup(false)
        return
      }
      setIsPopup(true)
      localStorage.removeItem('popupLastIntroClosedDate')
    }
  }, [todayPlane])

  const hasMessages = planeMessages.length > 0
  const isEmpty = !isLoading && isLogin && !hasMessages

  const handleClosePopup = () => {
    localStorage.setItem('popupLastIntroClosedDate', today)
    setIsPopup(false)
  }

  return (
    <section className="container">
      <div className="head5 px-4">
        <p className="text-black">내가 받은 종이비행기</p>
      </div>

      {isPopup && (
        <div className="mt-3 px-4">
          <Popup
            onClick={() => {
              router.push('/plane')
              if (todayPlane?.todaySentCount && todayPlane.todaySentCount > 0) {
                handleClosePopup()
              }
            }}
            page="profile"
            Ico={<IcoPaperAirplane />}
            title={
              <span className="body4-sb text-gray-800">
                오늘은{' '}
                <span className="text-purple-500">{todayPlane?.todayRecommendation?.name}</span>
                님에게 비행기를 보낼 수 있어요!
              </span>
            }
            description={
              <span className="body5 text-purple-500">하루 한 번, 랜덤 종이 비행기 보내기</span>
            }
          />
        </div>
      )}

      {isLoading && (
        <section className="h-full p-20">
          <LoadingSpinner />
        </section>
      )}

      {isEmpty && (
        <div className="mt-4 flex gap-4 px-4">
          <ul className="flex w-full justify-center">
            <li className="flex h-56 w-full flex-col items-center justify-center rounded-xl border bg-white p-5">
              <p className="body2 text-center text-gray-500">아직 받은 종이비행기가 없어요</p>
            </li>
          </ul>
        </div>
      )}

      {hasMessages && (
        <>
          <div
            ref={scrollRef}
            className={`mt-4 flex gap-4 px-4 ${
              planeMessages.length > 1
                ? 'overflow-x-scroll [&::-webkit-scrollbar]:hidden'
                : 'justify-center'
            }`}
            style={{ overscrollBehavior: 'contain' }}
          >
            <ul className="flex gap-4">
              {planeMessages.map((plane) => (
                <PlaneMessageCard
                  key={plane.messageId}
                  plane={plane}
                  isSingle={planeMessages.length === 1}
                />
              ))}
            </ul>
          </div>

          <div className="px-4">
            <button
              type="button"
              className="flex-row-center body4 mt-6 w-full gap-3 rounded-xl border border-black px-4 py-4 text-black"
              onClick={() => setIsSheetOpen(true)}
            >
              종이비행기 {planeMessages.length}개 모두 보기
            </button>
          </div>

          <PlaneBottomSheet
            planeMessages={planeMessages}
            open={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
          />
        </>
      )}
    </section>
  )
}
