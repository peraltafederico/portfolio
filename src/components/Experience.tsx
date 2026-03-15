import { useFadeIn } from '../hooks/useFadeIn'

const jobs = [
  {
    role: 'Senior Software Engineer',
    company: 'Pager Health',
    period: 'Jul 2025 — Present',
    location: 'Remote',
    description: 'Care coordination platform. React.js, Node.js, GCP, Terraform.',
  },
  {
    role: 'Lead Fullstack Engineer',
    company: 'Stateful',
    period: 'Jan 2024 — Mar 2025',
    location: 'Remote',
    description: 'Built open-source VSCode extension (Runme) and SaaS platform. Architected full-stack app with Redwood, GraphQL, Prisma, React, Auth0. Defined PostgreSQL data model for RBAC, notifications, invitations. Integrated GitHub and Slack. Contributed to VSCode Notebooks API integration with gRPC Golang backend.',
  },
  {
    role: 'Lead Fullstack Engineer',
    company: 'ReachSuite.io / Consensus',
    period: 'Feb 2023 — Jan 2024',
    location: 'Remote',
    description: 'Chrome Extension + TypeScript/Express backend for cloning customer applications into onboarding workflows. Built browser patches to proxy fetch/XHR, SSE, websockets, and auth. Developed React drag-and-drop widget builder.',
  },
  {
    role: 'Lead Fullstack Engineer',
    company: 'Fusebit',
    period: 'Nov 2021 — Jan 2023',
    location: 'Remote',
    description: 'User dashboard for creating integrations (Slack, Linear, GitHub) with isolated Lambda functions. Forked Monaco editor and Grafana for custom IDE with integrated logs. CI/CD with Kubernetes and Terraform.',
  },
  {
    role: 'Lead Fullstack Engineer',
    company: 'Molo Marine Management',
    period: 'Nov 2020 — Nov 2021',
    location: 'Remote',
    description: 'Migrated AngularJS to React + built React Native app. Payments, reservations, real-time chat (SignalR). Built custom calendar module with virtualization for large event volumes.',
  },
  {
    role: 'Software Engineer',
    company: 'Banco del Sol',
    period: 'Sep 2019 — Nov 2020',
    location: 'Buenos Aires',
    description: 'Customer onboarding with Facephi identity verification + Argentina\'s national registry. NestJS microservices in Kubernetes.',
  },
  {
    role: 'Software Engineer',
    company: 'Swiss Medical Group',
    period: 'Dec 2018 — Aug 2019',
    location: 'Buenos Aires',
    description: 'Migrated PHP to server-side rendered React. Healthcare card with Google Maps, doctor rating system.',
  },
]

export function Experience({ dark }: { dark: boolean }) {
  const ref = useFadeIn()
  const textColor = dark ? '#ededed' : '#171717'
  const mutedColor = dark ? '#888' : '#666'
  const borderColor = dark ? '#1f1f1f' : '#e5e5e5'
  const dotColor = dark ? '#333' : '#ccc'
  const lineColor = dark ? '#1a1a1a' : '#e0e0e0'

  return (
    <section id="experience" ref={ref as React.RefObject<HTMLElement>} className="fade-in py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-sm font-medium uppercase tracking-widest mb-10" style={{ color: mutedColor }}>
          Experience
        </h2>
        <div className="relative">
          <div className="absolute left-[5px] top-2 bottom-2 w-px" style={{ backgroundColor: lineColor }} />
          <div className="space-y-10">
            {jobs.map((job, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute left-0 top-[7px] w-[11px] h-[11px] rounded-full border-2"
                  style={{ borderColor: i === 0 ? '#3b82f6' : dotColor, backgroundColor: i === 0 ? '#3b82f6' : 'transparent' }} />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                  <h3 className="font-semibold text-[15px]" style={{ color: textColor }}>
                    {job.role}
                  </h3>
                  <span className="text-xs mt-0.5 sm:mt-0 shrink-0" style={{ color: mutedColor }}>
                    {job.period}
                  </span>
                </div>
                <p className="text-sm mb-2" style={{ color: dark ? '#3b82f6' : '#2563eb' }}>
                  {job.company} <span style={{ color: mutedColor }}>· {job.location}</span>
                </p>
                <p className="text-sm leading-relaxed" style={{ color: mutedColor }}>
                  {job.description}
                </p>
                {i < jobs.length - 1 && (
                  <div className="mt-10 -mx-8 h-px" style={{ backgroundColor: borderColor, opacity: 0.5 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
