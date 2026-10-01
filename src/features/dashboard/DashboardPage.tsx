import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAuthStore } from '@/features/auth/auth.store'
import { useCountUp } from '@/lib/useCountUp'
import EnrollmentChart from '../../components/charts/EnrollmentChart'

const STATS = [
  { label: 'Total courses', value: 48, note: '+4 this month' },
  { label: 'Published', value: 38, note: 'Active and live' },
  { label: 'In review', value: 10, note: 'Pending approval' },
  { label: 'Enrolled students', value: 3420, note: '+18% vs last term' },
]

function StatCard({ label, value, note }: (typeof STATS)[number]) {
  const shown = useCountUp(value)
  return (
    <Card>
      <p className="text-sm text-mute">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{shown.toLocaleString()}</p>
      <p className="text-xs text-mute">{note}</p>
    </Card>
  )
}

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  return (
    <>
      <PageHeader title={`Welcome back, ${user?.name.split(' ')[0]}`} subtitle="Here is what is happening across your courses." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-semibold">Enrollments this year</h2>
          <EnrollmentChart />
        </Card>
        <Card>
          <h2 className="font-semibold">Recent activity</h2>
          <ul className="mt-3 grid gap-2 text-sm text-mute">
            <li>Ayesha finished MERN stack</li>
            <li>Hamza joined Python for AI</li>
            <li>3 lectures published today</li>
          </ul>
        </Card>
      </div>
    </>
  )
}
