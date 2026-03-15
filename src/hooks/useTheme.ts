import { useState, useEffect } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return true
  })

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDark(isDark)

    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const newDark = !dark
    setDark(newDark)
    document.documentElement.classList.toggle('dark', newDark)
    document.documentElement.classList.toggle('light', !newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
  }

  return { dark, toggleTheme }
}
