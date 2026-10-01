import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Button } from '@/components/ui/Button'

type Pt = { x: number; y: number }
type Node = Pt & { born: number }
type Spark = Pt & { vx: number; vy: number; life: number }

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// Draw a path with your pointer. Every ~70px drops a lecture node. Release -> the path "compiles".
export default function PathStudio({ onCreate }: { onCreate: (lectures: number) => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const cv = useRef<HTMLCanvasElement>(null)
  const [count, setCount] = useState(0)
  const s = useRef({ pts: [] as Pt[], nodes: [] as Node[], sparks: [] as Spark[], down: false, since: 0, done: 0 })

  useEffect(() => {
    const canvas = cv.current!
    const box = wrap.current!
    const ctx = canvas.getContext('2d')!
    let w = 0, h = 0, raf = 0

    const resize = () => {
      const dpr = devicePixelRatio || 1
      w = box.clientWidth
      h = box.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(box)

    const frame = (t: number) => {
      const st = s.current
      const calm = reduced()
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2563eb'
      ctx.clearRect(0, 0, w, h)

      ctx.fillStyle = 'rgba(128,128,128,0.18)'
      for (let x = 12; x < w; x += 24) for (let y = 12; y < h; y += 24) ctx.fillRect(x, y, 2, 2)

      if (st.pts.length === 0) {
        ctx.fillStyle = 'rgba(128,128,128,0.9)'
        ctx.font = '14px system-ui'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('Drag here to draw your learning path', w / 2, h / 2)
      }

      // glowing curve through the points
      const p = st.pts
      if (p.length > 1) {
        ctx.save()
        ctx.lineWidth = 4
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = accent
        if (!calm) { ctx.shadowColor = accent; ctx.shadowBlur = 18 }
        ctx.beginPath()
        ctx.moveTo(p[0].x, p[0].y)
        for (let i = 1; i < p.length - 1; i++) {
          ctx.quadraticCurveTo(p[i].x, p[i].y, (p[i].x + p[i + 1].x) / 2, (p[i].y + p[i + 1].y) / 2)
        }
        ctx.lineTo(p[p.length - 1].x, p[p.length - 1].y)
        ctx.stroke()
        ctx.restore()
      }

      // lecture nodes
      st.nodes.forEach((n, i) => {
        const wave = st.done ? t - st.done - i * 110 : -1
        const lit = wave > 0
        if (!calm) {
          const k = ((t - n.born) % 1400) / 1400
          ctx.beginPath()
          ctx.arc(n.x, n.y, 12 + k * 16, 0, 7)
          ctx.strokeStyle = accent
          ctx.lineWidth = 2
          ctx.globalAlpha = (1 - k) * 0.5
          ctx.stroke()
          if (wave > 0 && wave < 500) {
            ctx.beginPath()
            ctx.arc(n.x, n.y, 12 + (wave / 500) * 30, 0, 7)
            ctx.lineWidth = 3
            ctx.globalAlpha = 1 - wave / 500
            ctx.stroke()
          }
          ctx.globalAlpha = 1
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y, 12, 0, 7)
        ctx.fillStyle = lit ? '#fff' : accent
        ctx.fill()
        ctx.lineWidth = 2
        ctx.strokeStyle = lit ? accent : '#fff'
        ctx.stroke()
        ctx.fillStyle = lit ? accent : '#fff'
        ctx.font = 'bold 11px system-ui'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(i + 1), n.x, n.y + 0.5)
      })

      // sparks that trail the pointer
      st.sparks = st.sparks.filter((q) => q.life > 0)
      ctx.fillStyle = accent
      for (const q of st.sparks) {
        q.x += q.vx
        q.y += q.vy
        q.vy += 0.03
        q.life -= 0.025
        ctx.globalAlpha = Math.max(q.life, 0)
        ctx.beginPath()
        ctx.arc(q.x, q.y, 2.5, 0, 7)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  const pos = (e: PointerEvent<HTMLCanvasElement>): Pt => {
    const r = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  function down(e: PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    const p = pos(e)
    s.current = { pts: [p], nodes: [{ ...p, born: performance.now() }], sparks: [], down: true, since: 0, done: 0 }
    setCount(1)
  }

  function move(e: PointerEvent<HTMLCanvasElement>) {
    const st = s.current
    if (!st.down) return
    const p = pos(e)
    const last = st.pts[st.pts.length - 1]
    const d = Math.hypot(p.x - last.x, p.y - last.y)
    if (d < 3) return
    st.pts.push(p)
    st.since += d
    if (st.since >= 70 && st.nodes.length < 30) {
      st.nodes.push({ ...p, born: performance.now() })
      st.since = 0
      setCount(st.nodes.length)
    }
    if (!reduced()) {
      for (let i = 0; i < 2; i++) {
        st.sparks.push({ ...p, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2 - 0.5, life: 1 })
      }
    }
  }

  function up() {
    const st = s.current
    if (!st.down) return
    st.down = false
    st.done = performance.now()
  }

  function clear() {
    s.current = { pts: [], nodes: [], sparks: [], down: false, since: 0, done: 0 }
    setCount(0)
  }

  return (
    <div className="mb-4 overflow-hidden rounded-[var(--r)] border border-line bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div>
          <h2 className="font-semibold">Path studio</h2>
          <p className="text-sm text-mute">Draw a path. Every node becomes a lecture.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={clear} disabled={!count}>Clear</Button>
          <Button onClick={() => onCreate(count)} disabled={!count}>Turn into course ({count})</Button>
        </div>
      </div>
      <div ref={wrap} className="h-56 border-t border-line sm:h-72">
        <canvas
          ref={cv}
          className="h-full w-full cursor-crosshair touch-none"
          aria-label="Drawing area for the learning path"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        />
      </div>
    </div>
  )
}