import { Moon, Sun } from 'lucide-react'

export function Header({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/[0.06]"
      style={{ backgroundColor: dark ? 'rgba(10,10,10,0.8)' : 'rgba(250,250,250,0.8)' }}>
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-sm font-semibold tracking-tight" style={{ color: dark ? '#ededed' : '#171717' }}>
          fp
        </a>
        <nav className="flex items-center gap-6">
          <a href="#projects" className="text-sm hover:opacity-100 transition-opacity" style={{ color: dark ? '#888' : '#666' }}>
            Projects
          </a>
          <a href="#experience" className="text-sm hover:opacity-100 transition-opacity" style={{ color: dark ? '#888' : '#666' }}>
            Experience
          </a>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg transition-colors cursor-pointer"
            style={{ color: dark ? '#888' : '#666' }}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </div>
    </header>
  )
}
