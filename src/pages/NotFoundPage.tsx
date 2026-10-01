import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="grid min-h-dvh place-items-center p-6 text-center">
      <div>
        <p className="text-6xl font-bold text-accent">404</p>
        <p className="mt-2 text-mute">This page does not exist.</p>
        <Link to="/dashboard" className="mt-4 inline-block font-semibold text-accent underline">Back to dashboard</Link>
      </div>
    </div>
  )
}
