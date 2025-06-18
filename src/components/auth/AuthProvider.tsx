import { getMemberMe } from '@/services/member'
import { useAuthStore } from '@/stores/login'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUserStore } from '@/stores/user'
export default function AuthProvider() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    //쿠키 기반으로 isLogin 여부 갱신
    useAuthStore.getState().checkToken()

    const user = localStorage.getItem('kiring-user')
    const isLogin = useAuthStore.getState().isLogin

    // 로그인 상태인데 유저 정보 없을 때 -> api 호출 동기화
    if (isLogin && !user) {
      const fetchUser = async () => {
        try {
          const { member } = await getMemberMe()
          useUserStore.getState().setUser(member)
        } catch (e) {
          console.error('❌ 유저 정보 조회 실패', e)
          router.replace('/login')
        }
      }

      fetchUser()
    }
  }, [pathname, router])

  return null
}
