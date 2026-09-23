import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

interface ShimmerTextProps {
  children: ReactNode
  className?: string
  duration?: number
  delay?: number
  repeatDelay?: number
  color?: string
  shimmerColor?: string
}

export function ShimmerText({
  children,
  className = '',
  duration = 2.8,
  delay = 0,
  repeatDelay = 1,
  color = '#b8bcc4',
  shimmerColor = 'rgba(255, 255, 255, 0.92)',
}: ShimmerTextProps) {
  const prefersReducedMotion = useReducedMotion()

  const shimmerStyle = {
    color,
    WebkitTextFillColor: 'transparent',
    background: `${color} linear-gradient(to right, ${color} 0%, ${shimmerColor} 40%, ${shimmerColor} 60%, ${color} 100%)`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50% 200%',
  } as CSSProperties

  if (prefersReducedMotion) {
    return (
      <span className={className} style={{ color }}>
        {children}
      </span>
    )
  }

  return (
    <span className="shimmer-text-wrap">
      <motion.span
        className={`shimmer-text ${className}`}
        style={shimmerStyle}
        initial={{ backgroundPositionX: '250%' }}
        animate={{ backgroundPositionX: ['-100%', '250%'] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatDelay,
          ease: 'linear',
        }}
      >
        {children}
      </motion.span>
    </span>
  )
}
