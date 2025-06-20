import LikedButton from '@/assets/liked-button.svg'
import LikeButton from '@/assets/like-button.svg'
import { useAuthStore } from '@/stores/login'
import SvgButton from '@/components/ui/SvgButton'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { likeToggleRestaurant } from '@/services/restaurant'
import { useState } from 'react'

interface LikeToggleButtonProps {
  isLiked: boolean
  placeId: number
}

export default function LikeToggleButton({ isLiked, placeId }: LikeToggleButtonProps) {
  const { isLogin } = useAuthStore()
  const router = useRouter()
  const [liked, setLiked] = useState(isLiked)

  const { mutate } = useMutation({
    mutationFn: () => likeToggleRestaurant(placeId),
    onSuccess: () => {
      setLiked((prev) => !prev)
    },
  })

  const handleClick = () => {
    if (!isLogin) router.push('/login')
    else mutate()
  }

  return (
    <SvgButton
      width={20}
      height={20}
      icon={liked ? <LikedButton /> : <LikeButton />}
      onClick={handleClick}
    />
  )
}
