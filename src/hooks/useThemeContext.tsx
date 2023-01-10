import { useContext } from 'react'
import ThemeContext from '../contexts/ThemeContext'

export default function useThemeContext () {
  const value = useContext(ThemeContext)
  return value
}
