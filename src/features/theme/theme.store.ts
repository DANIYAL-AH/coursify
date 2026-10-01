import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'professional' | 'cool' | 'animated'

type ThemeState = {
  theme: Theme
  accent: string
  setTheme: (theme: Theme) => void
  setAccent: (accent: string) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'professional',
      accent: '#2563eb',
      setTheme: (theme) => set({ theme }),
      setAccent: (accent) => set({ accent }),
    }),
    { name: 'ea-theme' },
  ),
)
