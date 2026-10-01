export type Course = { id: number; title: string; description: string; lectures: number; color: string }

export const COURSES: Course[] = [
  { id: 1, title: 'MERN stack', description: 'Build full-stack web applications', lectures: 3, color: '#0f766e' },
  { id: 2, title: 'Python for AI', description: 'Models from scratch', lectures: 12, color: '#7c3aed' },
  { id: 3, title: 'Flutter apps', description: 'Mobile UI and state', lectures: 8, color: '#0284c7' },
  { id: 4, title: 'Data structures', description: 'Exam-ready problem solving', lectures: 15, color: '#be123c' },
  { id: 5, title: 'Computer vision', description: 'OpenCV to deployment', lectures: 9, color: '#b45309' },
  { id: 6, title: 'Cloud basics', description: 'Deploy and scale', lectures: 6, color: '#4d7c0f' },
]
