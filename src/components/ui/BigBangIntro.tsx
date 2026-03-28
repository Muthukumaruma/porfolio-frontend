import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface Ring {
  radius: number
  maxRadius: number
  opacity: number
  width: number
}

const COLORS = [
  '#22d3ee', '#67e8f9', '#a5f3fc', '#ffffff',
  '#7dd3fc', '#38bdf8', '#e0f2fe', '#bae6fd',
]

export default function BigBangIntro({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onDoneRef = useRef(onDone)
  const [phase, setPhase] = useState<'buildup' | 'bang' | 'fadeout' | 'done'>('buildup')
  const [flash, setFlash] = useState(0)

  // Keep ref up to date without re-running the effect
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) { onDoneRef.current(); return }
    const ctx = canvas.getContext('2d')
    if (!ctx) { onDoneRef.current(); return }

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const isMobile = window.innerWidth < 768

    let animId: number
    let particles: Particle[] = []
    let rings: Ring[] = []
    let dotRadius = 0
    let dotGlow = 0
    let currentPhase = 'buildup'
    let phaseStart = performance.now()
    let flashOpacity = 0

    const spawnParticles = () => {
      const count = isMobile ? 120 : 220
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = (Math.random() * (isMobile ? 6 : 10) + 2) * (isMobile ? 0.8 : 1)
        const color = COLORS[Math.floor(Math.random() * COLORS.length)]
        const life = Math.random() * 60 + 40
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * (isMobile ? 2.5 : 3.5) + 0.5,
          opacity: 1,
          color,
          life,
          maxLife: life,
        })
      }
    }

    const spawnRings = () => {
      const maxR = Math.sqrt(cx * cx + cy * cy) * 1.3
      for (let i = 0; i < 4; i++) {
        rings.push({
          radius: 0,
          maxRadius: maxR * (0.6 + i * 0.15),
          opacity: 0.8 - i * 0.15,
          width: isMobile ? 2 - i * 0.3 : 3 - i * 0.5,
        })
      }
    }

    const draw = (now: number) => {
      const elapsed = now - phaseStart
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = '#0b0b0b'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (currentPhase === 'buildup') {
        // Dot grows and pulses
        const progress = Math.min(elapsed / 800, 1)
        dotRadius = 2 + progress * (isMobile ? 10 : 14)
        dotGlow = 10 + progress * (isMobile ? 30 : 50) + Math.sin(now * 0.01) * 5

        // Outer glow
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, dotGlow * 2)
        grd.addColorStop(0, `rgba(34,211,238,${0.3 + progress * 0.4})`)
        grd.addColorStop(0.4, `rgba(34,211,238,${0.1 + progress * 0.2})`)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Core dot
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, dotRadius)
        core.addColorStop(0, '#ffffff')
        core.addColorStop(0.3, '#22d3ee')
        core.addColorStop(1, 'transparent')
        ctx.fillStyle = core
        ctx.beginPath()
        ctx.arc(cx, cy, dotRadius + dotGlow * 0.3, 0, Math.PI * 2)
        ctx.fill()

        if (elapsed >= 800) {
          currentPhase = 'tension'
          phaseStart = now
        }

      } else if (currentPhase === 'tension') {
        // Rapid energy build — dot pulses intensely
        const progress = Math.min(elapsed / 400, 1)
        dotRadius = (isMobile ? 12 : 16) + Math.sin(now * 0.04) * 4 * progress
        const intensity = 0.6 + progress * 0.4

        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, isMobile ? 80 : 120)
        grd.addColorStop(0, `rgba(255,255,255,${intensity})`)
        grd.addColorStop(0.2, `rgba(34,211,238,${intensity * 0.8})`)
        grd.addColorStop(0.6, `rgba(34,211,238,${intensity * 0.3})`)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        if (elapsed >= 400) {
          currentPhase = 'bang'
          phaseStart = now
          flashOpacity = 1
          spawnParticles()
          spawnRings()
          setPhase('bang')
          setFlash(1)
        }

      } else if (currentPhase === 'bang') {
        // Flash
        if (flashOpacity > 0) {
          ctx.fillStyle = `rgba(255,255,255,${flashOpacity})`
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          flashOpacity = Math.max(0, flashOpacity - 0.06)
        }

        // Update + draw rings
        rings = rings.filter((r) => r.opacity > 0)
        rings.forEach((r) => {
          r.radius += isMobile ? 7 : 10
          r.opacity -= 0.018
          if (r.opacity <= 0) return
          ctx.save()
          ctx.strokeStyle = `rgba(34,211,238,${r.opacity})`
          ctx.lineWidth = r.width
          ctx.shadowBlur = 12
          ctx.shadowColor = 'rgba(34,211,238,0.8)'
          ctx.beginPath()
          ctx.arc(cx, cy, r.radius, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        })

        // Update + draw particles
        particles = particles.filter((p) => p.life > 0)
        particles.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          p.vy += 0.05 // subtle gravity
          p.vx *= 0.98
          p.vy *= 0.98
          p.life--
          p.opacity = p.life / p.maxLife

          ctx.save()
          ctx.globalAlpha = p.opacity
          ctx.fillStyle = p.color
          if (p.size > 1.5) {
            ctx.shadowBlur = 6
            ctx.shadowColor = p.color
          }
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })

        if (elapsed >= 1400 && particles.length === 0 && rings.length === 0) {
          currentPhase = 'fadeout'
          phaseStart = now
          setPhase('fadeout')
        } else if (elapsed >= 2200) {
          currentPhase = 'fadeout'
          phaseStart = now
          setPhase('fadeout')
        }

      } else if (currentPhase === 'fadeout') {
        // Draw remaining particles fading
        particles.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          p.life--
          p.opacity = (p.life / p.maxLife) * 0.5
          ctx.save()
          ctx.globalAlpha = p.opacity
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })

        if (elapsed >= 600) {
          cancelAnimationFrame(animId)
          setPhase('done')
          setTimeout(() => onDoneRef.current(), 400)
          return
        }
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    // Safety fallback: force-finish if animation hangs (e.g. mobile tab backgrounded)
    const safetyTimer = setTimeout(() => {
      cancelAnimationFrame(animId)
      onDoneRef.current()
    }, 5000)

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(safetyTimer)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-night"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Central flash overlay */}
        <AnimatePresence>
          {phase === 'bang' && (
            <motion.div
              className="absolute inset-0 bg-white pointer-events-none"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
