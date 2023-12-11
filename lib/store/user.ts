import { create } from 'zustand'
import { IUser } from '@/types/user'

interface UserState {
  user: IUser | null
  // eslint-disable-next-line no-unused-vars
  setUser: (user: IUser | undefined) => void
}

export const useUser = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
