'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/login'
import PlaneSection from '@/app/(header-layout)/profile/components/plane/PlaneSection'
import MemberInfoSection from '@/app/(header-layout)/profile/components/memberinfo/MemberInfoSection'
import ProfileSection from '@/app/(header-layout)/profile/components/profile/ProfileSection'
import { useUserStore } from '@/stores/user'

export default function MyPageContent() {
  const router = useRouter()
  const { isLogin, setLogout } = useAuthStore()
  const { user, clearUser } = useUserStore()

  // ✅ 로그아웃 시 토큰 / 유저정보 삭제
  const handleLogout = () => {
    setLogout()
    clearUser()
    router.replace(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
  }

  return (
    <>
      {isLogin && !user && (
        <section className="nav-pd h-full">
          <p className="flex-row-center body3 h-full text-gray-800">
            사용자 정보를 조회할 수 없습니다.
          </p>
        </section>
      )}
      {user && (
        <div className="flex flex-col gap-6">
          <ProfileSection user={user} />
          <MemberInfoSection user={user} />
          <div className="h-3 bg-gray-50"></div>
          <PlaneSection />
          {/* logout */}
          <section className="container border-y-12 border-gray-50">
            <div className="px-4 py-5">
              <button type="button" onClick={handleLogout} className="text-system-red">
                로그아웃
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
