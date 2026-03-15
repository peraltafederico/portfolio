import { useEffect, useRef } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { gsap } from '../hooks/useGsap'
import { useTheme } from '../layouts/RootLayout'

export function ContactCTA() {
  const { dark } = useTheme()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  const mutedColor = dark ? '#888' : '#666'
  const textColor = dark ? '#ededed' : '#171717'
  const buttonBorder = dark ? '#333' : '#ccc'

  useEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    const text = heading.textContent || ''
    heading.innerHTML = text
      .split('')
      .map((char) =>
        char === ' '
          ? '<span class="inline-block">&nbsp;</span>'
          : `<span class="inline-block opacity-0">${char}</span>`
      )
      .join('')

    const chars = heading.querySelectorAll('span')

    const tween = gsap.to(chars, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.04,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  const handleClick = () => {
    void navigate({ to: '/contact' })
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 lg:py-40">
      <h2
        ref={headingRef}
        className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
        style={{ color: textColor }}
      >
        Let's talk
      </h2>
      <p
        className="text-base sm:text-lg mt-6 max-w-md leading-relaxed"
        style={{ color: mutedColor }}
      >
        Have a project in mind? Looking for a senior engineer? Drop me a message.
      </p>
      <button
        onClick={handleClick}
        className="mt-10 px-8 py-3 text-sm font-medium tracking-wide rounded-full border transition-all duration-200 hover:scale-105 cursor-pointer"
        style={{
          color: textColor,
          borderColor: buttonBorder,
          backgroundColor: 'transparent',
        }}
      >
        Get in touch
      </button>
    </section>
  )
}
