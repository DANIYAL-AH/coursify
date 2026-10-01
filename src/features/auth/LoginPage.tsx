import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DEMO_USERS } from './auth.constants'
import { useAuthStore } from './auth.store'

export default function LoginPage() {
  const user = useAuthStore((s) => s.user)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to="/dashboard" replace />

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (login(email, password)) navigate('/dashboard', { replace: true })
    else setError('Invalid email or password')
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between bg-side p-10 text-white lg:flex">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent"><GraduationCap /></span>
          Edu Admin
        </div>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Manage learning,<br />all in one place.</h1>
          <p className="mt-3 max-w-md text-sideink">Courses, lectures, students and analytics in a fast, themeable portal.</p>
        </div>
        <p className="text-sm text-sideink">Portfolio project by Daniyal Ahmad</p>
      </section>

      <main className="grid place-items-center p-5">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold tracking-tight">Sign in</h2>
          <p className="mt-1 text-sm text-mute">Use a demo account below, or click a box to fill the form.</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {DEMO_USERS.map((u) => (
              <button
                key={u.role}
                type="button"
                onClick={() => { setEmail(u.email); setPassword(u.password); setError('') }}
                className="surface p-3 text-left text-sm transition hover:border-accent"
              >
                <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">{u.role}</span>
                <p className="mt-2 break-all font-mono text-xs">{u.email}</p>
                <p className="font-mono text-xs text-mute">{u.password}</p>
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <label className="grid gap-1 text-sm font-medium">
              Email
              <input className="field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              Password
              <input className="field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </label>
            {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="py-2.5">Sign in</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
