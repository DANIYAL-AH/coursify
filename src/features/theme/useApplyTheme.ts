import { useEffect } from 'react'
import { useThemeStore } from './theme.store'

export function useApplyTheme() {
  const theme = useThemeStore((s) => s.theme)
  const accent = useThemeStore((s) => s.accent)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.setProperty('--accent', accent)
  }, [theme, accent])
}
