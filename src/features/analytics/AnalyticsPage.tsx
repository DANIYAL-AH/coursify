import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import EnrollmentChart from '@/components/charts/EnrollmentChart'
import { useCoursesStore } from '@/features/courses/courses.store'
import { useCountUp } from '@/lib/useCountUp'

export default function AnalyticsPage() {
  const courses = useCoursesStore((s) => s.courses)
  const rate = useCountUp(76)
  const top = [...courses].sort((a, b) => b.lectures - a.lectures).slice(0, 4)

  return (
    <>
      <PageHeader title="Analytics" subtitle="How enrollments and completions are trending." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-semibold">Monthly enrollments</h2>
          <EnrollmentChart />
        </Card>
        <Card>
          <h2 className="font-semibold">Completion rate</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight">{rate}%</p>
          <p className="text-sm text-mute">of students finish a course</p>
        </Card>
        <Card className="lg:col-span-3">
          <h2 className="font-semibold">Largest courses</h2>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {top.map((c) => <li key={c.id} className="flex justify-between rounded-lg bg-line/50 px-3 py-2"><span>{c.title}</span><span className="text-mute">{c.lectures} lectures</span></li>)}
          </ul>
        </Card>
      </div>
    </>
  )
}