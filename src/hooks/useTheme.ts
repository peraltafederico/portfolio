import { useState, useEffect, useMemo } from 'react'

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return true
  return localStorage.getItem('theme') !== 'light'
}

export function useTheme() {
  const [dark, setDark] = useState(getInitialTheme)

  useEffect(() => {
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

  const colors = useMemo(() => ({
    text: dark ? '#ededed' : '#171717',
    muted: dark ? '#888' : '#666',
    bg: dark ? '#141414' : '#fafafa',
    cardHover: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    buttonBg: dark ? '#ffffff' : '#171717',
    buttonText: dark ? '#141414' : '#ffffff',
    activeNav: dark ? '#ededed' : '#171717',
  }), [dark])

  return { dark, toggleTheme, colors }
}
