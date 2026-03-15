import { Github, Linkedin, Mail } from 'lucide-react'

export function Hero({ dark }: { dark: boolean }) {
  const mutedColor = dark ? '#888' : '#666'
  const textColor = dark ? '#ededed' : '#171717'

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
            style={{ backgroundColor: dark ? '#1a1a1a' : '#f0f0f0', color: textColor }}>
            FP
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3" style={{ color: textColor }}>
          Federico Peralta
        </h1>
        <p className="text-lg mb-6" style={{ color: mutedColor }}>
          Senior Software Engineer
        </p>
        <p className="text-base leading-relaxed mb-8 max-w-xl" style={{ color: dark ? '#a0a0a0' : '#555' }}>
          Building things that matter. Senior Engineer with 7+ years of experience in fullstack development, specializing in React, TypeScript, Node.js and cloud infrastructure. Currently exploring the intersection of AI and vertical SaaS.
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/peraltafederico" target="_blank" rel="noopener noreferrer"
            className="p-2.5 rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: dark ? '#1a1a1a' : '#f0f0f0', color: mutedColor }}
            aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/peralta-federico" target="_blank" rel="noopener noreferrer"
            className="p-2.5 rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: dark ? '#1a1a1a' : '#f0f0f0', color: mutedColor }}
            aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="mailto:peralta.federico.manuel@gmail.com"
            className="p-2.5 rounded-lg transition-all hover:scale-105"
            style={{ backgroundColor: dark ? '#1a1a1a' : '#f0f0f0', color: mutedColor }}
            aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
