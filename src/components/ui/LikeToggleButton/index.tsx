import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeToggleRestaurant } from '@/services/restaurant'
import { useAuthStore } from '@/stores/login'
import { NOT_LIKE_BTN_IMG_URL, LIKED_BTN_IMG_URL } from '@/app/(header-layout)/place/constants'
import {
  RealRestaurantNearbyListResponseType,
  RealRestaurantType,
} from '@/app/(header-layout)/place/types/restaurantType'

type InfiniteQueryData = {
  pages: RealRestaurantNearbyListResponseType[]
  pageParams: unknown[]
}

type SinglePageData = {
  content: RealRestaurantType[]
  [key: string]: unknown
}

interface LikeToggleButtonProps {
  isLiked: boolean
  placeId: number
}

export default function LikeToggleButton({ isLiked, placeId }: LikeToggleButtonProps) {
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => likeToggleRestaurant(placeId),
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ['restaurantList'] })
        .forEach((query) => {
          queryClient.setQueryData(
            query.queryKey,
            (oldData: InfiniteQueryData | SinglePageData | undefined) => {
              if (!oldData) return oldData

              // 무한스크롤 데이터 구조 (pages 배열)
              if ('pages' in oldData && Array.isArray(oldData.pages)) {
                const infiniteData = oldData as InfiniteQueryData
                return {
                  ...infiniteData,
                  pages: infiniteData.pages.map((page) => ({
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
              }

              // 단일 페이지 데이터 구조 (content 배열)
              if ('content' in oldData && Array.isArray(oldData.content)) {
                const singleData = oldData as SinglePageData
                return {
                  ...singleData,
                  content: singleData.content.map((restaurant) =>
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
                }
              }

              return oldData
            },
          )
        })
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
        src={isLiked ? LIKED_BTN_IMG_URL : NOT_LIKE_BTN_IMG_URL}
        alt="좋아요 버튼 아이콘"
        width={20}
        height={20}
      />
    </button>
  )
}
