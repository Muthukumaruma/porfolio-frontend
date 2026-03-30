import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MouseGlow() {
  // No mouse cursor on touch devices — skip entirely
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }
  const mouseX = useMotionValue(-400)
  const mouseY = useMotionValue(-400)

  // Outer glow — slow, lazy follow
  const outerX = useSpring(mouseX, { stiffness: 60, damping: 18 })
  const outerY = useSpring(mouseY, { stiffness: 60, damping: 18 })

  // Inner dot — snappy follow
  const innerX = useSpring(mouseX, { stiffness: 200, damping: 22 })
  const innerY = useSpring(mouseY, { stiffness: 200, damping: 22 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return (
    <>
      {/* Large outer glow */}
      <motion.div
        className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ left: outerX, top: outerY, zIndex: 1 }}
      >
        <div
          className="w-[500px] h-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(34,211,238,0.055) 0%, rgba(34,211,238,0.015) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Small sharp inner glow */}
      <motion.div
        className="fixed pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ left: innerX, top: innerY, zIndex: 1 }}
      >
        <div
          className="w-24 h-24 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </>
  )
}
