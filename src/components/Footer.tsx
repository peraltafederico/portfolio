export function Footer({ dark }: { dark: boolean }) {
  const mutedColor = dark ? '#444' : '#aaa'

  return (
    <footer className="pt-20 pb-12">
      <p className="text-xs leading-relaxed" style={{ color: mutedColor }}>
        Built with React + Cloudflare Workers. &copy; 2026 Federico Peralta.
      </p>
    </footer>
  )
}
