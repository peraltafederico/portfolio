import { useEffect, useRef, useState, useCallback } from 'react'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { gsap, ScrollTrigger } from '../hooks/useGsap'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const sections = ['about', 'experience', 'skills', 'contact'] as const

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string>('about')

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
          className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          Federico Peralta
        </h1>
        <p data-hero="title" className="text-lg mt-3 text-[#666] dark:text-[#888]">
          Senior Software Engineer
        </p>
        <p
          data-hero="bio"
          className="text-sm leading-relaxed mt-4 max-w-xs text-[#555] dark:text-[#a0a0a0]"
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
                    className={`group flex items-center gap-3 text-xs font-medium uppercase tracking-widest transition-all duration-200 ${
                      isActive
                        ? 'text-neutral-900 dark:text-neutral-100'
                        : 'text-[#666] dark:text-[#888] hover:text-neutral-900 dark:hover:text-neutral-100'
                    }`}
                  >
                    <span
                      className={`inline-block h-px transition-all duration-200 group-hover:w-16 ${
                        isActive
                          ? 'w-16 bg-neutral-900 dark:bg-neutral-100'
                          : 'w-8 bg-[#666] dark:bg-[#888] group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100'
                      }`}
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
          href="/contact"
          className="inline-flex items-center px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 hover:scale-105 lg:hidden bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
        >
          Get in touch
        </a>
        <a
          href="https://github.com/peraltafederico"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-200 hover:scale-110 text-[#666] dark:text-[#888]"
          aria-label="GitHub"
        >
          <Github size={18} />
        </a>
        <a
          href="https://linkedin.com/in/peralta-federico"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-200 hover:scale-110 text-[#666] dark:text-[#888]"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="https://www.instagram.com/_pfederico/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-200 hover:scale-110 text-[#666] dark:text-[#888]"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
        <a
          href="/contact"
          className="transition-all duration-200 hover:scale-110 text-[#666] dark:text-[#888]"
          aria-label="Contact"
        >
          <Mail size={18} />
        </a>
      </div>
    </header>
  )
}
