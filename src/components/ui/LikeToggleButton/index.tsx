import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeToggleRestaurant } from '@/services/restaurant'
import { useAuthStore } from '@/stores/login'
import { NOT_LIKE_BTN_IMG_URL, LIKED_BTN_IMG_URL } from '@/app/(header-layout)/place/constants'
import { RealRestaurantNearbyListResponseType } from '@/app/(header-layout)/place/types/restaurantType'

interface LikeToggleButtonProps {
  isLiked: boolean
  placeId: number
}

export default function LikeToggleButton({ isLiked, placeId }: LikeToggleButtonProps) {
  const [liked, setLiked] = useState(isLiked)
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => likeToggleRestaurant(placeId),
    onSuccess: () => {
      setLiked((prev) => !prev)

      // 플레이스 페이지에서 좋아요 토글 시 리스트 데이터 업데이트
      if (pathname.startsWith('/place')) {
        queryClient
          .getQueryCache()
          .findAll({ queryKey: ['restaurantList'] })
          .forEach((query) => {
            queryClient.setQueryData(
              query.queryKey,
              (
                oldData:
                  | { pages: RealRestaurantNearbyListResponseType[]; pageParams: unknown[] }
                  | undefined,
              ) => {
                if (!oldData) return oldData

                return {
                  ...oldData,
                  pages: oldData.pages.map((page) => ({
                    ...page,
                    content: page.content.map((restaurant) =>
                      restaurant.placeId === placeId
                        ? {
                            ...restaurant,
                            isLiked: !restaurant.isLiked,
                            likeCount: restaurant.isLiked
                              ? restaurant.likeCount - 1
                              : restaurant.likeCount + 1,
                          }
                        : restaurant,
                    ),
                  })),
                }
              },
            )
          })
      }
    },
  })

  const handleClick = () => {
    if (!isLogin) router.push('/login')
    else mutate()
  }

  return (
    <button type="button" onClick={handleClick}>
      <span className="sr-only">좋아요 버튼</span>
      <Image
        src={liked ? LIKED_BTN_IMG_URL : NOT_LIKE_BTN_IMG_URL}
        alt="좋아요 버튼 아이콘"
        width={20}
        height={20}
      />
    </button>
  )
}
