'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const getInitialResolvedTheme = () => {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    getInitialResolvedTheme(),
  )

  const applyTheme = useCallback((t: Theme) => {
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches

    const finalTheme =
      t === 'system' ? (systemPrefersDark ? 'dark' : 'light') : t

    setResolvedTheme(finalTheme)
    document.documentElement.classList.toggle('dark', finalTheme === 'dark')
  }, [])

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme)
      localStorage.setItem('theme', newTheme)
      applyTheme(newTheme)
    },
    [applyTheme],
  )

  useEffect(() => {
    // const stored = (localStorage.getItem('theme') as Theme) ?? 'system' // 다크모드 비활성화
    setThemeState('light')
    applyTheme('light')
  }, [applyTheme])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
