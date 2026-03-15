export function Footer({ dark }: { dark: boolean }) {
  const mutedColor = dark ? '#555' : '#999'
  const borderColor = dark ? '#1a1a1a' : '#e5e5e5'

  return (
    <footer className="py-10 px-6 border-t" style={{ borderColor }}>
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs" style={{ color: mutedColor }}>
          Built with React + Cloudflare Workers
        </p>
        <p className="text-xs" style={{ color: mutedColor }}>
          &copy; 2026 Federico Peralta
        </p>
      </div>
    </footer>
  )
}
