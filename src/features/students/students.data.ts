export type Student = { id: number; name: string; course: string; progress: number; status: 'Active' | 'Completed' | 'Inactive' }

export const STUDENTS: Student[] = [
  { id: 1, name: 'Ayesha Khan', course: 'MERN stack', progress: 100, status: 'Completed' },
  { id: 2, name: 'Hamza Ali', course: 'Python for AI', progress: 74, status: 'Active' },
  { id: 3, name: 'Sara Malik', course: 'Flutter apps', progress: 58, status: 'Active' },
  { id: 4, name: 'Bilal Ahmed', course: 'Data structures', progress: 81, status: 'Active' },
  { id: 5, name: 'Hira Noor', course: 'Computer vision', progress: 67, status: 'Active' },
  { id: 6, name: 'Usman Raza', course: 'Cloud basics', progress: 12, status: 'Inactive' },
  { id: 7, name: 'Zainab Tariq', course: 'MERN stack', progress: 45, status: 'Active' },
  { id: 8, name: 'Fahad Iqbal', course: 'Python for AI', progress: 100, status: 'Completed' },
  { id: 9, name: 'Maryam Shah', course: 'Flutter apps', progress: 30, status: 'Inactive' },
  { id: 10, name: 'Talha Javed', course: 'Data structures', progress: 92, status: 'Active' },
]