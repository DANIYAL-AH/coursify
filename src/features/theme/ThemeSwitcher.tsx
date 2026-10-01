import { Briefcase, Moon, Sparkles } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useThemeStore, type Theme } from './theme.store'

const THEMES: { id: Theme; label: string; icon: typeof Moon }[] = [
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'cool', label: 'Cool', icon: Moon },
  { id: 'animated', label: 'Animation', icon: Sparkles },
]
const ACCENTS = ['#2563eb', '#7c3aed', '#059669', '#ea580c']

export default function ThemeSwitcher() {
  const { theme, accent, setTheme, setAccent } = useThemeStore()
  return (
    <div className="rounded-2xl bg-white/10 p-2 lg:p-3">
      <p className="mb-2 px-1 text-sm font-semibold text-white sm:hidden lg:block">View studio</p>
      <div className="grid gap-1">
        {THEMES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            title={label}
            aria-pressed={theme === id}
            onClick={() => setTheme(id)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm sm:justify-center lg:justify-start',
              theme === id ? 'bg-white/20 text-white ring-1 ring-accent' : 'hover:bg-white/10',
            )}
          >
            <Icon size={16} />
            <span className="sm:hidden lg:inline">{label} view</span>
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2 px-1 sm:flex-col sm:items-center lg:flex-row">
        {ACCENTS.map((c) => (
          <button
            key={c}
            aria-label={`Accent ${c}`}
            onClick={() => setAccent(c)}
            style={{ background: c }}
            className={cn('h-5 w-5 rounded-full border-2', accent === c ? 'border-white' : 'border-transparent')}
          />
        ))}
      </div>
    </div>
  )
}
