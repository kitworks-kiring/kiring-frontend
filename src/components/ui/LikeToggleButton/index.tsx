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

type QueryData = InfiniteQueryData | SinglePageData

interface LikeToggleButtonProps {
  isLiked: boolean
  placeId: number
}

export default function LikeToggleButton({ isLiked, placeId }: LikeToggleButtonProps) {
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  // 레스토랑 좋아요 상태 업데이트
  const updateRestaurantLikeStatus = (restaurant: RealRestaurantType) => {
    if (restaurant.placeId !== placeId) return restaurant

    return {
      ...restaurant,
      isLiked: !restaurant.isLiked,
      likeCount: restaurant.isLiked ? restaurant.likeCount - 1 : restaurant.likeCount + 1,
    }
  }

  // 무한스크롤 데이터일 경우
  const updateInfiniteData = (data: InfiniteQueryData): InfiniteQueryData => ({
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      content: page.content.map(updateRestaurantLikeStatus),
    })),
  })

  // 단일 페이지 데이터일 경우
  const updateSingleData = (data: SinglePageData): SinglePageData => ({
    ...data,
    content: data.content.map(updateRestaurantLikeStatus),
  })

  // 쿼리 데이터 업데이트
  const updateQueryData = (oldData: QueryData | undefined): QueryData | undefined => {
    if (!oldData) return oldData

    // 무한스크롤 구조 여부 확인 (pages 배열)
    if ('pages' in oldData && Array.isArray(oldData.pages)) {
      return updateInfiniteData(oldData as InfiniteQueryData)
    }

    // 단일 페이지 구조 여부 확인 (content 배열)
    if ('content' in oldData && Array.isArray(oldData.content)) {
      return updateSingleData(oldData as SinglePageData)
    }

    return oldData
  }

  const { mutate } = useMutation({
    mutationFn: () => likeToggleRestaurant(placeId),
    onSuccess: () => {
      // queryKey가 'restaurantList'인 모든 쿼리 데이터를 업데이트
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ['restaurantList'] })
        .forEach((query) => {
          queryClient.setQueryData(query.queryKey, updateQueryData)
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
        width={24}
        height={24}
      />
    </button>
  )
}
