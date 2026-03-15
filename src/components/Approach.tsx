import { useScrollReveal } from '../hooks/useGsap'

export function Approach({ dark }: { dark: boolean }) {
  const ref = useScrollReveal<HTMLElement>()
  const mutedColor = dark ? '#888' : '#666'
  const textColor = dark ? '#a0a0a0' : '#555'

  return (
    <section id="approach" ref={ref} className="py-20 lg:py-24">
      <h2 className="text-sm font-medium uppercase tracking-widest mb-10" style={{ color: mutedColor }}>
        How I Work
      </h2>
      <div className="space-y-4 text-sm leading-relaxed" style={{ color: textColor }}>
        <p>
          I treat AI as a senior teammate, not a toy. Multi-agent workflows handle boilerplate, testing, and repetitive tasks while I focus on architecture, product decisions, and solving real user problems.
        </p>
        <p>
          The result: I ship what used to take a team, solo. My stack isn't a language, it's whatever tool solves the problem best.
        </p>
      </div>
    </section>
  )
}
