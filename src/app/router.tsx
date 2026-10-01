import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ProtectedRoute from '@/features/auth/ProtectedRoute'

// each page is its own chunk, so first load stays small
const LoginPage = lazy(() => import('@/features/auth/LoginPage'))
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'))
const CoursesPage = lazy(() => import('@/features/courses/CoursesPage'))
const StudentsPage = lazy(() => import('@/features/students/StudentsPage'))
const AnalyticsPage = lazy(() => import('@/features/analytics/AnalyticsPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const router = createBrowserRouter([
  { path: '/login', element: <Suspense fallback={null}><LoginPage /></Suspense> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/courses', element: <CoursesPage /> },
          { path: '/students', element: <StudentsPage /> },
          { path: '/analytics', element: <AnalyticsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Suspense fallback={null}><NotFoundPage /></Suspense> },
])