import { useScrollReveal } from '../hooks/useGsap'

const jobs = [
  {
    role: 'Senior Software Engineer',
    company: 'Pager Health',
    period: 'Jul 2025 - Present',
    location: 'Remote',
    description:
      'Revolutionizing how people access care through a real-time, efficient care coordination platform. Passionate about using technology to reshape healthcare!',
    skills: ['React.js', 'Node.js', 'Google Cloud Platform (GCP)', 'Terraform'],
  },
  {
    role: 'Lead Fullstack Engineer',
    company: 'Stateful',
    period: 'Jan 2024 - Mar 2025',
    location: 'Remote',
    description:
      'Building an open-source VSCode extension, Runme, and a SaaS platform, Stateful, to share terminal commands, sessions, and environments across teams using interactive markdown files. I led the creation of Stateful by architecting a full-stack app using Redwood, leveraging GraphQL, Prisma, React, and Auth0 for identity management. I defined the entire data model in PostgreSQL to support scalable and reusable models for RBAC, notifications, invitations, and conversations. I also integrated GitHub and Slack for syncing and sharing runnable markdowns. Additionally, I contributed to the open-source extension by integrating the VSCode Notebooks API to run cells and render outputs directly from Markdown files, connecting it to both a gRPC Golang backend for parsing and execution and the Stateful API by integrating a GraphQL client into the extension. My main contribution was defining a flexible data model and selecting reusable design patterns, enhancing team efficiency and setting a foundation for future development.',
    skills: [
      'TypeScript',
      'Node.js',
      'Auth0',
      'PostgreSQL',
      'React.js',
      'GraphQL',
      'Redwood',
      'Go',
      'gRPC',
    ],
  },
  {
    role: 'Lead Fullstack Engineer',
    company: 'ReachSuite.io (now Consensus)',
    period: 'Feb 2023 - Jan 2024',
    location: 'Remote',
    description:
      'Using a Chrome Extension and a TypeScript+Express backend we allowed our customers to fully clone their applications to create an onboarding workflow that runs onto a ReachSuite domain. Ensuring that the cloned application behaved as if it were running on its original domain presented many challenges, addressed by replicating and hijacking their JavaScript Runtime. This was possible by developing browser patches to proxy fetch/XHR requests, server-sent events, websockets, and authentication. This approach ensured that requests were redirected to our Express server, allowing for efficient caching of responses by saving them in our database. Additionally, I developed the React application that runs on top of customer sites. This app lets users drag and drop widgets to easily design and implement onboarding processes.',
    skills: ['Jest', 'Next.js', 'AWS', 'TypeScript', 'Express.js', 'PostgreSQL', 'React.js'],
  },
  {
    role: 'Lead Fullstack Engineer',
    company: 'Fusebit',
    period: 'Nov 2021 - Jan 2023',
    location: 'Remote',
    description:
      'I led our team in building a user dashboard using React, integrated with Auth0 to handle authentication. This dashboard empowered users to create integrations with various providers such as Slack, Linear, and GitHub, creating and running isolated Lambda functions for each integration. To provide a user-friendly experience when creating the integrations, we forked Monaco to render a customized editor and also forked Grafana to create a custom log system. This custom log system was integrated directly within our version of Monaco, allowing users to access and monitor logs from the IDE on Grafana dashboards. Lastly, I was responsible for the maintenance and optimization of our CI/CD workflows. This involved utilizing Kubernetes to deploy our microservices, coupled with the use of Terraform as our Infrastructure as Code.',
    skills: [
      'Next.js',
      'Auth0',
      'AWS',
      'TypeScript',
      'Express.js',
      'Grafana',
      'PostgreSQL',
      'React.js',
    ],
  },
  {
    role: 'Lead Fullstack Engineer',
    company: 'Molo Marine Management',
    period: 'Nov 2020 - Nov 2021',
    location: 'Remote',
    description:
      'At Molo, I led the migration of our aging AngularJS application to a modern React framework and the development of our React Native app. My role involved developing key features like payments, marine transactions, user management, reservations, and a real-time chat leveraging SignalR. A notable accomplishment was designing and building a robust calendar module from the ground up, similar to fullcalendarjs. This calendar was specially engineered to render a large volume of events simultaneously, utilizing virtualization for efficient performance.',
    skills: [
      'Next.js',
      'SignalR',
      'TypeScript',
      'React Native',
      'Stripe',
      'Microsoft Azure',
      'React.js',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Banco del Sol',
    period: 'Sep 2019 - Nov 2020',
    location: 'Hybrid, Buenos Aires',
    description:
      "I was an integral member of the team responsible for developing the customer onboarding process from scratch. In the React Native app, we achieved a seamless onboarding experience by integrating Facephi as an identity provider with Argentina's national people registry. On the server side, I contributed by developing and deploying NestJS microservices. Each microservice had its own database, hosted in Kubernetes, effectively decentralizing customer core information across different sources.",
    skills: [
      'NestJS',
      'MySQL',
      'Kubernetes',
      'MongoDB',
      'TypeScript',
      'Express.js',
      'React Native',
      'Microsoft Azure',
      'React.js',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Swiss Medical Group',
    period: 'Dec 2018 - Aug 2019',
    location: 'On-site, Buenos Aires',
    description:
      'Our goal was to transition our main application from an outdated PHP framework to a modern server side rendered React platform. My contributions included developing multiple modules, one of which was a healthcare card integrated with Google Maps to enable direct contact with doctors. Another significant module I developed was a doctor rating system, both of which considerably enhanced client engagement and user experience.',
    skills: ['JavaScript', 'Node.js', 'Express.js', 'React.js'],
  },
]

export function Experience({ dark }: { dark: boolean }) {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.15 })
  const textColor = dark ? '#ededed' : '#171717'
  const mutedColor = dark ? '#888' : '#666'
  const pillBg = dark ? 'rgba(59,130,246,0.15)' : 'rgba(37,99,235,0.1)'
  const pillColor = dark ? '#60a5fa' : '#2563eb'

  return (
    <section id="experience" ref={ref} className="py-20 lg:py-24">
      <h2
        className="text-sm font-medium uppercase tracking-widest mb-10"
        style={{ color: mutedColor }}
      >
        Experience
      </h2>
      <div className="space-y-10">
        {jobs.map((job, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-6">
            <span
              className="text-xs pt-1 shrink-0 whitespace-nowrap"
              style={{ color: mutedColor }}
            >
              {job.period}
            </span>
            <div>
              <h3 className="font-semibold text-[15px]" style={{ color: textColor }}>
                {job.role}
              </h3>
              <p className="text-sm mb-2" style={{ color: dark ? '#3b82f6' : '#2563eb' }}>
                {job.company}{' '}
                <span style={{ color: mutedColor }}>· {job.location}</span>
              </p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: mutedColor }}>
                {job.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: pillBg, color: pillColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
