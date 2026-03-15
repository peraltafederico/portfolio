import { useScrollReveal } from '../hooks/useGsap'

export function About({ dark }: { dark: boolean }) {
  const ref = useScrollReveal<HTMLElement>()
  const mutedColor = dark ? '#888' : '#666'
  const textColor = dark ? '#a0a0a0' : '#555'

  return (
    <section id="about" ref={ref} className="py-20 lg:py-24">
      <h2 className="text-sm font-medium uppercase tracking-widest mb-10" style={{ color: mutedColor }}>
        About
      </h2>
      <div className="space-y-4 text-sm leading-relaxed" style={{ color: textColor }}>
        <p>
          I am a proficient senior fullstack developer with over seven years of experience in JavaScript/TypeScript, passionate about engaging in every stage of application development.
        </p>
        <p>
          In frontend development, I have extensive experience with React, including its ecosystem frameworks such as Next.js, Gatsby, and React Native, as well as proficiency in essential React development tools like React Query, React Hook Form, Apollo Client, Redux, Tailwind CSS, Styled Components, and Material-UI.
        </p>
        <p>
          In backend, my expertise lies in Node.js, where I've developed scalable production APIs using multiple protocols like REST, Websockets and GraphQL. I'm proficient working with frameworks such as Express, NestJS, and Koa.
        </p>
        <p>
          In cloud computing, I have a strong background creating and maintaining CI/CD workflows with GitHub Actions, GitLab CI, and Jenkins, and also building scalable infrastructures using AWS services like ECS, Beanstalk, and Kubernetes (EKS).
        </p>
      </div>
    </section>
  )
}
