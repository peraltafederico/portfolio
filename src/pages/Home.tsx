import { useState, useEffect, useCallback } from 'react'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Experience } from '../components/Experience'
import { Skills } from '../components/Skills'
import { ContactCTA } from '../components/ContactCTA'
import { Footer } from '../components/Footer'
import { ScrollTrigger } from '../hooks/useGsap'
import { useTheme } from '../layouts/RootLayout'

const sections = ['about', 'experience', 'skills'] as const

export function Home() {
  const { dark, setDark } = useTheme()
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

  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-screen-xl lg:flex lg:justify-between lg:gap-16">
        <Hero
          dark={dark}
          onToggle={() => setDark(!dark)}
          activeSection={activeSection}
          onNav={handleNav}
        />
        <main className="lg:w-1/2 lg:py-24 pb-24">
          <About dark={dark} />
          <Experience dark={dark} />
          <Skills dark={dark} />
          <ContactCTA />
          <Footer dark={dark} />
        </main>
      </div>
    </div>
  )
}
