import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { isLikelyValidToken } from '@/lib/jwt'

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
        Cookies.set('accessToken', accessToken, { path: '/', expires: 0.02 })
        Cookies.set('refreshToken', refreshToken, { path: '/', expires: 7 })
        set({ isLogin: true })
      },

      setLogout: () => {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        set({ isLogin: false })
      },

      checkToken: () => {
        const token = Cookies.get('accessToken')
        set({ isLogin: token ? isLikelyValidToken(token) : false })
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
