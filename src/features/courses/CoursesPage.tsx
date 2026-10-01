import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { useThemeStore } from '@/features/theme/theme.store'
import CreateCourseModal from './CreateCourseModal'
import PathStudio from './PathStudio'
import { useCoursesStore } from './courses.store'

export default function CoursesPage() {
  const courses = useCoursesStore((s) => s.courses)
  const theme = useThemeStore((s) => s.theme)
  const [open, setOpen] = useState(false)
  const [studio, setStudio] = useState(false)
  const [draft, setDraft] = useState(1)
  const [query, setQuery] = useState('')
  const shown = courses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()))
  const animated = theme === 'animated'

  return (
    <>
      <PageHeader
        title="Courses"
        subtitle="Create, organize and monitor all courses and lecture curriculum."
        action={
          <div className="flex gap-2">
            {animated && (
              <Button variant="ghost" onClick={() => setStudio(!studio)}>
                {studio ? 'Hide path studio' : 'Draw path studio'}
              </Button>
            )}
            <Button onClick={() => { setDraft(1); setOpen(true) }}>Create course</Button>
          </div>
        }
      />
      {animated && studio && <PathStudio onCreate={(n) => { setDraft(n); setOpen(true) }} />}
      <input className="field mb-4 max-w-sm" placeholder="Search courses" aria-label="Search courses" value={query} onChange={(e) => setQuery(e.target.value)} />
      {shown.length === 0 && <Card className="text-mute">No courses match your search.</Card>}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 lg:gap-4">
        {shown.map((c) => (
          <Card key={c.id} className="p-3">
            <div className="grid h-24 place-items-center rounded-lg text-xl font-bold text-white sm:h-32" style={{ background: c.color }}>
              {c.title.split(' ')[0]}
            </div>
            <h3 className="mt-3 font-semibold">{c.title}</h3>
            <p className="text-sm text-mute">{c.description}</p>
            <span className="mt-2 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
              {c.lectures} lectures
            </span>
          </Card>
        ))}
      </div>
      <CreateCourseModal open={open} onClose={() => setOpen(false)} initialLectures={draft} />
    </>
  )
}