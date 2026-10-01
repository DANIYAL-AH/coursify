import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { useCoursesStore } from './courses.store'

type Props = { open: boolean; onClose: () => void }

export default function CreateCourseModal({ open, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const addCourse = useCoursesStore((s) => s.addCourse)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [lectures, setLectures] = useState(1)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    addCourse({ title: title.trim(), description: description.trim(), lectures })
    setTitle('')
    setDescription('')
    setLectures(1)
    onClose()
  }

  return (
    <dialog ref={ref} onClose={onClose} className="surface m-auto w-[min(440px,92vw)] p-5 text-ink backdrop:bg-black/50">
      <h2 className="text-lg font-semibold">Create course</h2>
      <form onSubmit={onSubmit} className="mt-4 grid gap-4">
        <label className="grid gap-1 text-sm font-medium">
          Title
          <input className="field" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Description
          <input className="field" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Lectures
          <input className="field" type="number" min={1} max={100} value={lectures} onChange={(e) => setLectures(+e.target.value)} required />
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </dialog>
  )
}