import { useEffect, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'

export function MouseSpotlight() {
  const { dark } = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
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

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300" />
}
