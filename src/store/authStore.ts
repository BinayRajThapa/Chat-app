import { create } from 'zustand'
import { User } from '../types/user'
import { getCurrentUser, setCurrentUser, logout as clearCurrent } from '../utils/localStorage'

interface AuthState {
  user: User | null
  login: (user: User) => void
  logout: () => void
  setUserFromLocalStorage: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getCurrentUser(),
  login: (user) => {
    setCurrentUser(user)
    set({ user })
  },
  logout: () => {
    clearCurrent()
    set({ user: null })
  },
  setUserFromLocalStorage: () => {
    set({ user: getCurrentUser() })
  },
}))
