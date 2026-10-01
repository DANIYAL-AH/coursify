import { create } from 'zustand'
import { COURSES, type Course } from './courses.data'

const COLORS = ['#0f766e', '#7c3aed', '#0284c7', '#be123c', '#b45309', '#4d7c0f']

type CoursesState = {
  courses: Course[]
  addCourse: (c: Pick<Course, 'title' | 'description' | 'lectures'>) => void
}

export const useCoursesStore = create<CoursesState>((set) => ({
  courses: COURSES,
  addCourse: (c) =>
    set((s) => ({
      courses: [{ ...c, id: s.courses.length + 1, color: COLORS[s.courses.length % COLORS.length] }, ...s.courses],
    })),
}))