import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { dark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-2 transition-all duration-200 hover:scale-110 cursor-pointer rounded-full text-[#666] dark:text-[#888]"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
