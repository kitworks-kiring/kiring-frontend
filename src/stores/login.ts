import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
interface AuthState {
  isLogin: boolean
  setLogin: (accessToken: string, refreshToken: string) => void
  setLogout: () => void
  checkToken: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,

      setLogin: (accessToken, refreshToken) => {
        // TODO: 리프레시 토큰으로 accessToken 재발급 api 연동되면 수정 예정
        Cookies.set('accessToken', accessToken, { path: '/', expires: 30 })
        Cookies.set('refreshToken', refreshToken, { path: '/', expires: 30 })
        set({ isLogin: true })
      },

      setLogout: () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        set({ isLogin: false })
      },

      checkToken: () => {
        const token = Cookies.get('accessToken')
        set({ isLogin: !!token })
      },
    }),
    {
      name: 'kiring',
      partialize: (state) => ({
        isLogin: state.isLogin,
      }),
    },
  ),
)
