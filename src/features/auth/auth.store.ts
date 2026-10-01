import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { DEMO_USERS } from './auth.constants'

export type SessionUser = { name: string; title: string; role: string; email: string }

type AuthState = {
  user: SessionUser | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const found = DEMO_USERS.find((u) => u.email === email.trim().toLowerCase() && u.password === password)
        if (!found) return false
        set({ user: { name: found.name, title: found.title, role: found.role, email: found.email } })
        return true
      },
      logout: () => set({ user: null }),
    }),
    { name: 'ea-auth', storage: createJSONStorage(() => sessionStorage) },
  ),
)
