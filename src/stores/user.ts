import { useQuery } from '@tanstack/react-query'
import { getMemberMe } from '@/services/member'
import { MemberMeType } from '@/app/types/memberType'
import { useAuthStore } from '@/stores/login'

export const useUser = () => {
  const { isLogin } = useAuthStore()

  const query = useQuery<{ member: MemberMeType }>({
    queryKey: ['memberMe'],
    queryFn: getMemberMe,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    enabled: isLogin,
  })

  return {
    user: query.data?.member,
    ...query,
  }
}
