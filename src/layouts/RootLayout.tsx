import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Outlet } from '@tanstack/react-router'

interface ThemeContextValue {
  dark: boolean
  setDark: (dark: boolean) => void
}

const ThemeContext = createContext<ThemeContextValue>({ dark: true, setDark: () => {} })

export function useTheme() {
  return useContext(ThemeContext)
}

export function RootLayout() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.className = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return

    const color = dark ? 'rgba(100, 100, 255, 0.06)' : 'rgba(100, 100, 255, 0.04)'

    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, ${color}, transparent 80%)`
      })
    }

    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.background = 'transparent'
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      />
      <Outlet />
    </ThemeContext.Provider>
  )
}
