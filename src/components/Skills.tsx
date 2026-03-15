import { useFadeIn } from '../hooks/useFadeIn'

const skills = [
  'TypeScript', 'React', 'Node.js', 'Next.js', 'React Native',
  'PostgreSQL', 'GraphQL', 'AWS', 'GCP', 'Terraform',
  'Kubernetes', 'Docker', 'Cloudflare Workers', 'Supabase',
  'Auth0', 'NestJS', 'Express', 'Tailwind CSS', 'AI/LLM Integration',
]

export function Skills({ dark }: { dark: boolean }) {
  const ref = useFadeIn()
  const mutedColor = dark ? '#888' : '#666'
  const pillBg = dark ? '#141414' : '#f0f0f0'
  const pillBorder = dark ? '#1f1f1f' : '#e0e0e0'
  const pillText = dark ? '#a0a0a0' : '#555'

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="fade-in py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-sm font-medium uppercase tracking-widest mb-10" style={{ color: mutedColor }}>
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: pillBg, border: `1px solid ${pillBorder}`, color: pillText }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
