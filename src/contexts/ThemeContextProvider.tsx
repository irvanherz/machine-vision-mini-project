import { ReactNode, useState } from 'react'
import ThemeContext, { ThemeType } from './ThemeContext'

type ThemeContextProviderProps = {
  children: ReactNode
}
export default function ThemeContextProvider ({ children }:ThemeContextProviderProps) {
  const [theme, setTheme] = useState<ThemeType>('light')
  return (
    <ThemeContext.Provider
      value={{ theme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
