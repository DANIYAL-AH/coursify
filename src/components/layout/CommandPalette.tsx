import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Moon, Sparkles, type LucideIcon } from 'lucide-react'
import { useThemeStore, type Theme } from '@/features/theme/theme.store'
import { cn } from '@/lib/cn'
import { onBackdrop } from '@/lib/backdrop'
import { NAV_ITEMS } from './nav.config'

type Props = { open: boolean; onClose: () => void }

const THEME_ITEMS: { id: Theme; label: string; icon: LucideIcon }[] = [
  { id: 'professional', label: 'Professional view', icon: Briefcase },
  { id: 'cool', label: 'Cool view', icon: Moon },
  { id: 'animated', label: 'Animation view', icon: Sparkles },
]

export default function CommandPalette({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()
  const setTheme = useThemeStore((s) => s.setTheme)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)

  const items = [
    ...NAV_ITEMS.map((n) => ({ group: 'Pages', label: n.label, icon: n.icon, run: () => navigate(n.to) })),
    ...THEME_ITEMS.map((t) => ({ group: 'Appearance', label: t.label, icon: t.icon, run: () => setTheme(t.id) })),
  ]
  const list = items.filter((i) => `${i.group} ${i.label}`.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) { d.showModal(); setQ(''); setActive(0) }
    if (!open && d.open) d.close()
  }, [open])

  function choose(i: number) {
    list[i]?.run()
    onClose()
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, list.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    if (e.key === 'Enter') choose(active)
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={onBackdrop(onClose)}
      className="surface mx-auto mt-[12vh] w-[min(520px,92vw)] overflow-hidden p-0 text-ink backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div>
        <input
          autoFocus
          className="w-full border-b border-line bg-transparent px-4 py-3.5 outline-none"
          placeholder="Search pages and actions"
          aria-label="Search pages and actions"
          value={q}
          onChange={(e) => { setQ(e.target.value); setActive(0) }}
          onKeyDown={onKey}
        />
        <ul className="max-h-72 overflow-y-auto p-2">
          {list.map((item, i) => (
            <li key={item.label}>
              {(i === 0 || list[i - 1].group !== item.group) && (
                <p className="px-3 pb-1 pt-2 text-xs font-medium text-mute">{item.group}</p>
              )}
              <button
                onClick={() => choose(i)}
                onMouseEnter={() => setActive(i)}
                className={cn('flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm', i === active && 'bg-accent/15')}
              >
                <item.icon size={16} className="text-accent" />
                {item.label}
              </button>
            </li>
          ))}
          {list.length === 0 && <li className="px-3 py-3 text-sm text-mute">No match. Try a page name.</li>}
        </ul>
        <p className="flex gap-4 border-t border-line px-4 py-2 text-xs text-mute">
          <span>Up / Down to move</span><span>Enter to select</span><span>Esc or click outside to close</span>
        </p>
      </div>
    </dialog>
  )
}