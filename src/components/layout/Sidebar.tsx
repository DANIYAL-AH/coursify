import { NavLink } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import ThemeSwitcher from '@/features/theme/ThemeSwitcher'
import { cn } from '@/lib/cn'
import { NAV_ITEMS } from './nav.config'

type Props = { open: boolean; onClose: () => void }

// mobile: slide-in drawer | tablet: icon rail | laptop: full sidebar
export default function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {open && <div className="fixed inset-0 z-20 bg-black/50 sm:hidden" onClick={onClose} />}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex w-72 max-w-[84vw] shrink-0 flex-col gap-1 overflow-y-auto bg-side p-3 text-sideink backdrop-blur-[var(--blur)] transition-transform',
          'sm:sticky sm:top-0 sm:h-dvh sm:w-[68px] sm:translate-x-0 lg:w-64',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="mb-3 flex items-center gap-3 p-2 font-semibold text-white sm:justify-center lg:justify-start">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent"><GraduationCap size={20} /></span>
          <span className="sm:hidden lg:inline">Edu Admin</span>
        </div>

        <nav className="grid gap-1" aria-label="Main">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm sm:justify-center lg:justify-start',
                  isActive ? 'bg-accent text-white' : 'hover:bg-white/10',
                )
              }
            >
              <Icon size={18} />
              <span className="sm:hidden lg:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4"><ThemeSwitcher /></div>
      </aside>
    </>
  )
}
