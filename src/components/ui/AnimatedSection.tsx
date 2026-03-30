import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: Props) {
  // On mobile: only fade (no translate), shorter duration, no delay
  const initial = isMobile
    ? { opacity: 0 }
    : direction === 'up'
    ? { opacity: 0, y: 40 }
    : direction === 'left'
    ? { opacity: 0, x: -40 }
    : direction === 'right'
    ? { opacity: 0, x: 40 }
    : { opacity: 0 }

  const animate = { opacity: 1, y: 0, x: 0 }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: isMobile ? 0.35 : 0.6, delay: isMobile ? 0 : delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: isMobile ? 0.05 : 0.1,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: isMobile ? 10 : 30 },
  show: { opacity: 1, y: 0, transition: { duration: isMobile ? 0.3 : 0.5, ease: 'easeOut' } },
}
