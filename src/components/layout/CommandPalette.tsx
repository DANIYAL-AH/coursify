import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeStore, type Theme } from '@/features/theme/theme.store'
import { cn } from '@/lib/cn'
import { NAV_ITEMS } from './nav.config'

type Props = { open: boolean; onClose: () => void }

export default function CommandPalette({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()
  const setTheme = useThemeStore((s) => s.setTheme)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)

  const items = [
    ...NAV_ITEMS.map((n) => ({ label: `Go to ${n.label}`, run: () => navigate(n.to) })),
    ...(['professional', 'cool', 'animated'] as Theme[]).map((t) => ({ label: `Switch to ${t} view`, run: () => setTheme(t) })),
  ]
  const list = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()))

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
    <dialog ref={ref} onClose={onClose} className="surface mx-auto mt-[12vh] w-[min(520px,92vw)] p-0 text-ink backdrop:bg-black/50">
      <input
        autoFocus
        className="w-full border-b border-line bg-transparent p-4 outline-none"
        placeholder="Search pages and actions"
        aria-label="Search pages and actions"
        value={q}
        onChange={(e) => { setQ(e.target.value); setActive(0) }}
        onKeyDown={onKey}
      />
      <ul className="max-h-72 overflow-y-auto py-2">
        {list.map((item, i) => (
          <li key={item.label}>
            <button onClick={() => choose(i)} className={cn('w-full px-4 py-2.5 text-left text-sm', i === active && 'bg-accent/15')}>
              {item.label}
            </button>
          </li>
        ))}
        {list.length === 0 && <li className="px-4 py-3 text-sm text-mute">No match. Try a page name.</li>}
      </ul>
    </dialog>
  )
}