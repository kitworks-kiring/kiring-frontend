import PlaneMessageCard from '@/app/(header-layout)/profile/components/plane/PlaneMessageCard'
import { useQuery } from '@tanstack/react-query'
import { getPlaneRead } from '@/services/plane'
import { useAuthStore } from '@/stores/login'
import { PlaneMessage } from '@/app/(header-layout)/profile/constants'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function PlaneSection() {
  const { isLogin } = useAuthStore()
  const { data, isLoading } = useQuery<PlaneMessage[]>({
    queryKey: ['planeRead'],
    queryFn: getPlaneRead,
    refetchOnWindowFocus: false,
    enabled: isLogin,
  })
  const planeMessages = data ?? []

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

      {!isLoading && isLogin && planeMessages.length === 0 && (
        <section className="nav-pd h-full">
          <p className="flex-row-center body3 h-full text-gray-800">
            종이 비행기를 조회할 수 없습니다.
          </p>
        </section>
      )}

      {!isLoading && planeMessages.length > 0 && (
        <>
          <div className="mt-4 flex gap-4 overflow-x-scroll px-4 [&::-webkit-scrollbar]:hidden">
            <ul className="flex gap-4">
              {planeMessages.map((plane: PlaneMessage) => (
                <PlaneMessageCard key={plane.messageId} plane={plane} />
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
