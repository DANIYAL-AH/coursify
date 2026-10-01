import { useState } from 'react'
import { ArrowDownUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { STUDENTS } from './students.data'

const COURSE_NAMES = Array.from(new Set(STUDENTS.map((s) => s.course)))

export default function StudentsPage() {
  const [query, setQuery] = useState('')
  const [course, setCourse] = useState('all')
  const [desc, setDesc] = useState(true)

  const rows = STUDENTS
    .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    .filter((s) => course === 'all' || s.course === course)
    .sort((a, b) => (desc ? b.progress - a.progress : a.progress - b.progress))

  return (
    <>
      <PageHeader title="Students" subtitle="Everyone enrolled across your courses." />
      <div className="mb-4 flex flex-wrap gap-3">
        <input className="field max-w-xs" placeholder="Search students" aria-label="Search students" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="field max-w-[200px]" aria-label="Filter by course" value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="all">All courses</option>
          {COURSE_NAMES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <Card className="overflow-x-auto p-0 sm:p-0">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="text-mute">
            <tr className="border-b border-line">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Course</th>
              <th className="p-3 font-medium">
                <button onClick={() => setDesc(!desc)} className="flex items-center gap-1">Progress <ArrowDownUp size={14} /></button>
              </th>
              <th className="p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id} className="border-b border-line last:border-0">
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3 text-mute">{s.course}</td>
                <td className="p-3">
                  <div className="h-2 w-32 rounded-full bg-line"><div className="h-2 rounded-full bg-accent" style={{ width: `${s.progress}%` }} /></div>
                </td>
                <td className="p-3"><span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">{s.status}</span></td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={4} className="p-4 text-mute">No students found.</td></tr>}
          </tbody>
        </table>
      </Card>
    </>
  )
}