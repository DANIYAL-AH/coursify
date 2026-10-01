import { useNavigate } from 'react-router-dom'
import { LogOut, Menu, Search } from 'lucide-react'
import { useAuthStore } from '@/features/auth/auth.store'

type Props = { onMenu: () => void; onSearch: () => void }

export default function Topbar({ onMenu, onSearch }: Props) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="topbar sticky top-0 z-10 flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-2">
        <button onClick={onMenu} aria-label="Open menu" className="rounded-lg p-2 hover:bg-line sm:hidden">
          <Menu size={20} />
        </button>
        <button onClick={onSearch} className="surface flex items-center gap-2 px-3 py-2 text-sm text-mute">
          <Search size={16} />
          <span>Search</span>
          <kbd className="hidden rounded border border-line px-1.5 text-xs md:inline">Ctrl K</kbd>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right text-sm leading-tight sm:block">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-mute">{user?.role}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-line">
          <LogOut size={16} /> <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </header>
  )
}