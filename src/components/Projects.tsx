import { ArrowUpRight } from 'lucide-react'
import { useFadeIn } from '../hooks/useFadeIn'

const projects = [
  {
    name: 'UpGrief',
    description: 'A social network for people who lost someone. Memorial profiles, AI companion, community.',
    url: 'https://upgrief.federicoperalta.com',
  },
  {
    name: 'Flextario',
    description: 'AI-powered inventory management for small hardware stores. Async supplier list parsing, product deduplication.',
    url: 'https://flextario.federicoperalta.com',
  },
  {
    name: 'GymCoach',
    description: 'AI workout companion with exercise tracking, machine photo recognition, and personalized routines.',
    url: 'https://gym.federicoperalta.com',
  },
]

export function Projects({ dark }: { dark: boolean }) {
  const ref = useFadeIn()
  const textColor = dark ? '#ededed' : '#171717'
  const mutedColor = dark ? '#888' : '#666'
  const surfaceColor = dark ? '#141414' : '#f5f5f5'
  const borderColor = dark ? '#1f1f1f' : '#e5e5e5'

  return (
    <section id="projects" ref={ref as React.RefObject<HTMLElement>} className="fade-in py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-sm font-medium uppercase tracking-widest mb-10" style={{ color: mutedColor }}>
          Projects
        </h2>
        <div className="grid gap-4">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl p-5 transition-all hover:scale-[1.01]"
              style={{ backgroundColor: surfaceColor, border: `1px solid ${borderColor}` }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold" style={{ color: textColor }}>
                  {project.name}
                </h3>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity mt-1" style={{ color: mutedColor }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: mutedColor }}>
                {project.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
