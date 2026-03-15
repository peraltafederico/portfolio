import { useEffect, useRef, useState, useCallback } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { gsap, ScrollTrigger } from '../hooks/useGsap'
import { useTheme } from '../hooks/useTheme'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const sections = ['about', 'experience', 'skills', 'contact'] as const

export function Hero() {
  const { dark } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string>('about')

  const mutedColor = dark ? '#888' : '#666'
  const textColor = dark ? '#ededed' : '#171717'
  const activeColor = dark ? '#ededed' : '#171717'

  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    sections.forEach((id) => {
      const trigger = ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      })
      triggers.push(trigger)
    })

    return () => triggers.forEach((t) => t.kill())
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const name = el.querySelector('[data-hero="name"]')
    const title = el.querySelector('[data-hero="title"]')
    const bio = el.querySelector('[data-hero="bio"]')
    const nav = el.querySelector('[data-hero="nav"]')
    const links = el.querySelector('[data-hero="links"]')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.6 } })
    tl.fromTo(name, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
      .fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.5')
      .fromTo(bio, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.5')
      .fromTo(nav, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.5')
      .fromTo(links, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.5')

    return () => { tl.kill() }
  }, [])

  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <header
      ref={containerRef}
      className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 pt-24 pb-12"
    >
      <div>
        <h1
          data-hero="name"
          className="text-4xl sm:text-5xl font-bold tracking-tight"
          style={{ color: textColor }}
        >
          Federico Peralta
        </h1>
        <p data-hero="title" className="text-lg mt-3" style={{ color: mutedColor }}>
          Senior Software Engineer
        </p>
        <p
          data-hero="bio"
          className="text-sm leading-relaxed mt-4 max-w-xs"
          style={{ color: dark ? '#a0a0a0' : '#555' }}
        >
          Senior fullstack engineer who ships fast. I use AI agents (Claude Code, multi-agent orchestration) as force multipliers, automating the repetitive so I can focus on the problems that actually matter. 7+ years building production apps with TypeScript, React, and Node.js, from fintech to healthcare to developer tools.
        </p>

        <nav data-hero="nav" className="hidden lg:block mt-12">
          <ul className="space-y-3">
            {navItems.map(({ id, label }) => {
              const isActive = activeSection === id
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleNav(e, id)}
                    className="group flex items-center gap-3 text-xs font-medium uppercase tracking-widest transition-all duration-200 hover:!text-[var(--nav-active)]"
                    style={{
                      color: isActive ? activeColor : mutedColor,
                      '--nav-active': activeColor,
                    } as React.CSSProperties}
                  >
                    <span
                      className="inline-block h-px transition-all duration-200 group-hover:w-16"
                      style={{
                        width: isActive ? 64 : 32,
                        backgroundColor: isActive ? activeColor : mutedColor,
                      }}
                    />
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <div data-hero="links" className="flex items-center gap-4 mt-8 lg:mt-0">
        <a
          href="https://github.com/peraltafederico"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-200 hover:scale-110"
          style={{ color: mutedColor }}
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          href="https://linkedin.com/in/peralta-federico"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-200 hover:scale-110"
          style={{ color: mutedColor }}
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="/contact"
          className="transition-all duration-200 hover:scale-110"
          style={{ color: mutedColor }}
          aria-label="Contact"
        >
          <Mail size={18} />
        </a>
      </div>
    </header>
  )
}
