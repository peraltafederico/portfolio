import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Moon, Sun } from 'lucide-react'
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

    const color = dark ? 'rgba(100, 100, 255, 0.06)' : 'rgba(80, 80, 200, 0.08)'

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
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-6 right-6 z-50 p-2 transition-all duration-200 hover:scale-110 cursor-pointer rounded-full"
        style={{ color: dark ? '#888' : '#666' }}
        aria-label="Toggle theme"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <Outlet />
    </ThemeContext.Provider>
  )
}
