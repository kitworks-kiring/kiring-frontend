import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MemberMeType } from '@/app/types/memberType'

interface UserState {
  user: MemberMeType | null
  setUser: (user: MemberMeType) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'kiring-user',
      partialize: (state) => ({ user: state.user }),
    },
  ),
)
