import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function useScrollReveal<T extends HTMLElement>(
  options: { stagger?: number; delay?: number; y?: number } = {}
) {
  const ref = useRef<T>(null)
  const { stagger = 0, delay = 0, y = 30 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = stagger > 0 ? el.children : el

    const tween = gsap.from(targets, {
      opacity: 0,
      y,
      duration: 0.8,
      delay,
      ease: 'power3.out',
      stagger: stagger > 0 ? stagger : undefined,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [stagger, delay, y])

  return ref
}
