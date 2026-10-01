import { Suspense, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import PageSkeleton from '@/components/ui/PageSkeleton'
import CommandPalette from './CommandPalette'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const [palette, setPalette] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette(true)
      }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex min-h-dvh">
      <a href="#main" className="sr-only z-50 rounded-lg bg-accent px-3 py-2 text-white focus:not-sr-only focus:absolute focus:left-3 focus:top-3">
        Skip to content
      </a>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 flex-1">
        <Topbar onMenu={() => setOpen(true)} onSearch={() => setPalette(true)} />
        <main id="main" tabIndex={-1} className="mx-auto w-full max-w-[1500px] p-4 outline-none sm:p-6 lg:p-7">
                    <div key={pathname} className="page-in">
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
    </div>
  )
}