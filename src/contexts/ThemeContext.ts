import { createContext } from 'react'

export type ThemeType = 'light' | 'dark'

export type ThemeContextValue = {
  theme: ThemeType
  setTheme: (t: ThemeType) => void
}

export default createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: (_) => {}
})
