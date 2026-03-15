import { useScrollReveal } from '../hooks/useGsap'

const skills = [
  // AI
  'Claude Code', 'Multi-Agent Orchestration', 'OpenAI API', 'Gemini API',
  'Prompt Engineering', 'Vercel AI SDK', 'RAG',
  // Frontend
  'TypeScript', 'React', 'React Native', 'Next.js', 'Styled Components',
  'CSS', 'Tailwind CSS', 'React Query / TanStack', 'Apollo Client',
  // Backend
  'Node.js', 'Express', 'NestJS', 'GraphQL', 'WebSockets',
  'Apollo Server', 'Prisma', 'SignalR',
  // Databases
  'PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Redis',
  // Cloud & Infra
  'AWS', 'GCP', 'Cloudflare Workers', 'EKS', 'Kubernetes',
  'Istio', 'Karpenter', 'Docker', 'Terraform',
  // Auth & Payments
  'Auth0', 'Stripe',
  // Testing & CI/CD
  'Unit Testing', 'Jest', 'Mocha', 'Playwright',
  'GitHub Actions', 'GitLab CI',
]

export function Skills({ dark }: { dark: boolean }) {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.05 })
  const mutedColor = dark ? '#888' : '#666'
  const pillBg = dark ? '#141414' : '#f0f0f0'
  const pillBorder = dark ? '#1f1f1f' : '#e0e0e0'
  const pillText = dark ? '#a0a0a0' : '#555'

  return (
    <section id="skills" ref={ref} className="py-20 lg:py-24">
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
    </section>
  )
}
