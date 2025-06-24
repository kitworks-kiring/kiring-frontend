'use client'

import PlaneMessageCard from '@/app/(header-layout)/profile/components/plane/PlaneMessageCard'
import { useQuery } from '@tanstack/react-query'
import { getPlaneRead } from '@/services/plane'
import { useAuthStore } from '@/stores/login'
import { PlaneMessage } from '@/app/(header-layout)/profile/constants'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function PlaneSection() {
  const { isLogin } = useAuthStore()

  const { data: planeMessages = [], isLoading } = useQuery<PlaneMessage[]>({
    queryKey: ['planeRead'],
    queryFn: getPlaneRead,
    refetchOnWindowFocus: false,
    enabled: isLogin,
  })

  const hasMessages = planeMessages.length > 0
  const isEmpty = !isLoading && isLogin && !hasMessages

  return (
    <section className="container">
      <div className="head5 px-4">
        <p className="text-black">내가 받은 종이비행기</p>
      </div>

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
            className={`mt-4 flex gap-4 px-4 ${
              planeMessages.length > 1
                ? 'overflow-x-scroll [&::-webkit-scrollbar]:hidden'
                : 'justify-center'
            }`}
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
            >
              종이비행기 {planeMessages.length}개 모두 보기
            </button>
          </div>
        </>
      )}
    </section>
  )
}
