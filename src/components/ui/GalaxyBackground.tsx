import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  opacityDir: number
  color: string
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  length: number
  opacity: number
  active: boolean
}

const STAR_COLORS = [
  '#ffffff',
  '#ffffff',
  '#ffffff',
  '#e0f7ff',
  '#22d3ee',
  '#7dd3fc',
  '#a5f3fc',
  '#bae6fd',
]

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: Star[] = []
    let shooters: ShootingStar[] = []
    let lastShoot = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    const buildStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 6000)
      stars = Array.from({ length: Math.min(count, 260) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.6 + 0.2,
        opacity: Math.random() * 0.7 + 0.1,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }))
    }

    const spawnShooter = () => {
      const angle = (Math.PI / 5) + (Math.random() - 0.5) * 0.4
      const speed = Math.random() * 7 + 5
      shooters.push({
        x: Math.random() * canvas.width * 0.7,
        y: Math.random() * canvas.height * 0.35,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 130 + 60,
        opacity: 0.9 + Math.random() * 0.1,
        active: true,
      })
    }

    const drawNebula = () => {
      // Cyan nebula top-right
      const g1 = ctx.createRadialGradient(
        canvas.width * 0.75, canvas.height * 0.15,
        0,
        canvas.width * 0.75, canvas.height * 0.15,
        canvas.width * 0.3,
      )
      g1.addColorStop(0, 'rgba(34,211,238,0.055)')
      g1.addColorStop(0.5, 'rgba(34,211,238,0.018)')
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Blue-violet nebula left-center
      const g2 = ctx.createRadialGradient(
        canvas.width * 0.1, canvas.height * 0.45,
        0,
        canvas.width * 0.1, canvas.height * 0.45,
        canvas.width * 0.28,
      )
      g2.addColorStop(0, 'rgba(99,102,241,0.05)')
      g2.addColorStop(0.5, 'rgba(99,102,241,0.015)')
      g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Cyan nebula bottom-center
      const g3 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.8,
        0,
        canvas.width * 0.5, canvas.height * 0.8,
        canvas.width * 0.22,
      )
      g3.addColorStop(0, 'rgba(34,211,238,0.04)')
      g3.addColorStop(1, 'transparent')
      ctx.fillStyle = g3
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Nebula (static blobs)
      drawNebula()

      // Twinkling stars
      stars.forEach((s) => {
        s.opacity += s.opacityDir * 0.004
        if (s.opacity >= 0.85) { s.opacity = 0.85; s.opacityDir = -1 }
        if (s.opacity <= 0.08) { s.opacity = 0.08; s.opacityDir = 1 }

        ctx.save()
        ctx.globalAlpha = s.opacity
        ctx.fillStyle = s.color
        if (s.size > 1.1) {
          ctx.shadowBlur = 5
          ctx.shadowColor = s.color
        }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Shooting stars — spawn every 3–5s
      if (timestamp - lastShoot > Math.random() * 2000 + 3000) {
        if (shooters.filter((s) => s.active).length < 2) {
          spawnShooter()
          lastShoot = timestamp
        }
      }

      shooters = shooters.filter((s) => s.active)
      shooters.forEach((s) => {
        s.x += s.vx
        s.y += s.vy
        s.opacity -= 0.012

        if (s.opacity <= 0 || s.x > canvas.width || s.y > canvas.height) {
          s.active = false
          return
        }

        const tailX = s.x - s.vx * (s.length / Math.sqrt(s.vx ** 2 + s.vy ** 2))
        const tailY = s.y - s.vy * (s.length / Math.sqrt(s.vx ** 2 + s.vy ** 2))

        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
        grad.addColorStop(0, `rgba(34,211,238,${s.opacity})`)
        grad.addColorStop(0.3, `rgba(255,255,255,${s.opacity * 0.6})`)
        grad.addColorStop(1, 'rgba(34,211,238,0)')

        ctx.save()
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(34,211,238,0.8)'
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
        ctx.restore()
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    buildStars()
    animId = requestAnimationFrame(draw)

    const onResize = () => {
      resize()
      buildStars()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.85 }}
    />
  )
}
