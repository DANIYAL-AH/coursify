const BARS = [30, 42, 38, 55, 61, 58, 74, 82, 77, 90, 96, 104]

export default function EnrollmentChart() {
  const max = Math.max(...BARS)
  return (
    <svg viewBox="0 0 360 140" className="mt-3 w-full" role="img" aria-label="Monthly enrollments">
      {BARS.map((v, i) => {
        const h = (v / max) * 120
        return <rect key={i} x={i * 30 + 6} y={130 - h} width="20" height={h} rx="5" className="fill-accent" opacity={0.45 + i * 0.05} />
      })}
    </svg>
  )
}
