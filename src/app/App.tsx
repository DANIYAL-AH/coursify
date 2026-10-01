import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import { useApplyTheme } from '@/features/theme/useApplyTheme'

export default function App() {
  useApplyTheme()
  return <RouterProvider router={router} />
}
