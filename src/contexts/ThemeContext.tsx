import React, { createContext, useContext, useState, useEffect } from 'react'

export type ThemeMode = 'light' | 'dark'
export type ColorScheme = 'blue' | 'purple' | 'green' | 'orange' | 'pink'

interface ThemeContextType {
  mode: ThemeMode
  colorScheme: ColorScheme
  toggleMode: () => void
  setColorScheme: (scheme: ColorScheme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('weather-app-theme-mode')
    return (saved as ThemeMode) || 'light'
  })
  
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() => {
    const saved = localStorage.getItem('weather-app-color-scheme')
    return (saved as ColorScheme) || 'blue'
  })

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light')
  }

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme)
  }

  useEffect(() => {
    localStorage.setItem('weather-app-theme-mode', mode)
    document.documentElement.setAttribute('data-theme', mode)
    document.documentElement.setAttribute('data-color-scheme', colorScheme)
  }, [mode, colorScheme])

  const value: ThemeContextType = {
    mode,
    colorScheme,
    toggleMode,
    setColorScheme,
    isDark: mode === 'dark'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
