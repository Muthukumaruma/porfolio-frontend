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

    const isMobile = () => window.innerWidth < 768
    let animId: number
    let stars: Star[] = []
    let shooters: ShootingStar[] = []
    let lastShoot = 0
    let lastFrame = 0
    let galaxyAngle = 0
    // Offscreen canvases (drawn once, reused every frame)
    let nebulaCanvas: HTMLCanvasElement | null = null
    let galaxyTexture: HTMLCanvasElement | null = null
    let galaxySize = 0
    let galaxyCx = 0
    let galaxyCy = 0

    const resize = () => {
      // Canvas is position:fixed — only needs to cover the viewport
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      nebulaCanvas = null // rebuild nebula on resize
      galaxyTexture = null // rebuild galaxy texture on resize
    }

    const buildGalaxyTexture = () => {
      const mobile = isMobile()
      const size = Math.round(Math.max(canvas.width, canvas.height) * (mobile ? 0.4 : 0.55))
      const tex = document.createElement('canvas')
      tex.width = size
      tex.height = size
      const tctx = tex.getContext('2d')!
      const cx = size / 2
      const cy = size / 2

      // Bright core glow
      const core = tctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.14)
      core.addColorStop(0, 'rgba(224,247,255,0.55)')
      core.addColorStop(0.35, 'rgba(125,211,252,0.26)')
      core.addColorStop(1, 'rgba(125,211,252,0)')
      tctx.fillStyle = core
      tctx.beginPath()
      tctx.arc(cx, cy, size * 0.14, 0, Math.PI * 2)
      tctx.fill()

      // Spiral arms — dust/star clumps along logarithmic spirals, squished for a tilted-disk look
      const arms = 2
      const turns = 2.1
      const pointsPerArm = mobile ? 90 : 160
      const armColors = ['180,230,255', '34,211,238', '165,180,255']
      for (let a = 0; a < arms; a++) {
        const armOffset = (a / arms) * Math.PI * 2
        for (let i = 0; i < pointsPerArm; i++) {
          const t = i / pointsPerArm
          const angle = armOffset + t * turns * Math.PI * 2
          const radius = t * size * 0.46
          const jitter = (Math.random() - 0.5) * size * 0.03
          const x = cx + Math.cos(angle) * radius + jitter
          const y = cy + Math.sin(angle) * radius * 0.5 + jitter * 0.5
          const alpha = (1 - t) * 0.16 * (0.6 + Math.random() * 0.4)
          const r = (1.5 + Math.random() * 2.5) * (mobile ? 4 : 6)
          const color = armColors[Math.floor(Math.random() * armColors.length)]
          const grad = tctx.createRadialGradient(x, y, 0, x, y, r)
          grad.addColorStop(0, `rgba(${color},${alpha})`)
          grad.addColorStop(1, `rgba(${color},0)`)
          tctx.fillStyle = grad
          tctx.beginPath()
          tctx.arc(x, y, r, 0, Math.PI * 2)
          tctx.fill()
        }
      }

      galaxySize = size
      return tex
    }

    const buildStars = () => {
      const mobile = isMobile()
      const maxStars = mobile ? 100 : 260
      const density = mobile ? 4000 : 6000
      const count = Math.floor((canvas.width * canvas.height) / density)
      stars = Array.from({ length: Math.min(count, maxStars) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.6 + 0.2,
        opacity: Math.random() * 0.7 + 0.1,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }))
    }

    const buildNebulaCanvas = () => {
      const nc = document.createElement('canvas')
      nc.width = canvas.width
      nc.height = canvas.height
      const nctx = nc.getContext('2d')!

      const g1 = nctx.createRadialGradient(
        canvas.width * 0.75, canvas.height * 0.15, 0,
        canvas.width * 0.75, canvas.height * 0.15, canvas.width * 0.3,
      )
      g1.addColorStop(0, 'rgba(34,211,238,0.055)')
      g1.addColorStop(0.5, 'rgba(34,211,238,0.018)')
      g1.addColorStop(1, 'transparent')
      nctx.fillStyle = g1
      nctx.fillRect(0, 0, nc.width, nc.height)

      const g2 = nctx.createRadialGradient(
        canvas.width * 0.1, canvas.height * 0.45, 0,
        canvas.width * 0.1, canvas.height * 0.45, canvas.width * 0.28,
      )
      g2.addColorStop(0, 'rgba(99,102,241,0.05)')
      g2.addColorStop(0.5, 'rgba(99,102,241,0.015)')
      g2.addColorStop(1, 'transparent')
      nctx.fillStyle = g2
      nctx.fillRect(0, 0, nc.width, nc.height)

      const g3 = nctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.8, 0,
        canvas.width * 0.5, canvas.height * 0.8, canvas.width * 0.22,
      )
      g3.addColorStop(0, 'rgba(34,211,238,0.04)')
      g3.addColorStop(1, 'transparent')
      nctx.fillStyle = g3
      nctx.fillRect(0, 0, nc.width, nc.height)

      return nc
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

    const draw = (timestamp: number) => {
      // Throttle to ~30fps on mobile
      const mobile = isMobile()
      const minInterval = mobile ? 33 : 16
      if (timestamp - lastFrame < minInterval) {
        animId = requestAnimationFrame(draw)
        return
      }
      lastFrame = timestamp

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Nebula — drawn to offscreen canvas once, then blitted
      if (!nebulaCanvas) nebulaCanvas = buildNebulaCanvas()
      ctx.drawImage(nebulaCanvas, 0, 0)

      // Distant spiral galaxy — pre-rendered texture, rotated live for a slow drifting swirl
      if (!galaxyTexture) {
        galaxyTexture = buildGalaxyTexture()
        galaxyCx = canvas.width * (mobile ? 0.82 : 0.88)
        galaxyCy = canvas.height * (mobile ? 0.1 : 0.1)
      }
      galaxyAngle += mobile ? 0.00006 : 0.00009
      ctx.save()
      ctx.translate(galaxyCx, galaxyCy)
      ctx.rotate(galaxyAngle)
      ctx.globalAlpha = mobile ? 0.7 : 0.85
      ctx.drawImage(galaxyTexture, -galaxySize / 2, -galaxySize / 2)
      ctx.restore()

      // Twinkling stars
      const twinkleStep = mobile ? 0.006 : 0.004
      stars.forEach((s) => {
        s.opacity += s.opacityDir * twinkleStep
        if (s.opacity >= 0.85) { s.opacity = 0.85; s.opacityDir = -1 }
        if (s.opacity <= 0.08) { s.opacity = 0.08; s.opacityDir = 1 }

        ctx.save()
        ctx.globalAlpha = s.opacity
        ctx.fillStyle = s.color
        // Skip shadowBlur on mobile — very expensive
        if (!mobile && s.size > 1.1) {
          ctx.shadowBlur = 5
          ctx.shadowColor = s.color
        }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Shooting stars — skip on mobile for performance
      if (!mobile) {
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
      }

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
