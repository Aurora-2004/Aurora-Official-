import { useCallback, useEffect, useRef } from 'react'

const SETTLED_THRESHOLD_DEG = 0.25
const EASING_PER_FRAME = 0.2
const MIN_TILT_VIEWPORT_PX = 768

interface Tilt {
  rotateXDeg: number
  rotateYDeg: number
}

const FLAT: Tilt = { rotateXDeg: 0, rotateYDeg: 0 }

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function hasCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches
}

function isTiltDisabled() {
  return prefersReducedMotion() || hasCoarsePointer() || window.innerWidth < MIN_TILT_VIEWPORT_PX
}

function tiltTowardPointer(trackingArea: HTMLElement, pointer: React.MouseEvent, maxTiltDeg: number): Tilt {
  const bounds = trackingArea.getBoundingClientRect()
  if (bounds.width === 0 || bounds.height === 0) return FLAT
  const offsetFromCenterX = (pointer.clientX - bounds.left) / bounds.width - 0.5
  const offsetFromCenterY = (pointer.clientY - bounds.top) / bounds.height - 0.5
  return {
    rotateXDeg: offsetFromCenterY * -maxTiltDeg,
    rotateYDeg: offsetFromCenterX * maxTiltDeg,
  }
}

function easeToward(current: Tilt, target: Tilt): Tilt {
  return {
    rotateXDeg: current.rotateXDeg + (target.rotateXDeg - current.rotateXDeg) * EASING_PER_FRAME,
    rotateYDeg: current.rotateYDeg + (target.rotateYDeg - current.rotateYDeg) * EASING_PER_FRAME,
  }
}

function isSettled(tilt: Tilt) {
  return Math.abs(tilt.rotateXDeg) < SETTLED_THRESHOLD_DEG && Math.abs(tilt.rotateYDeg) < SETTLED_THRESHOLD_DEG
}

function applyTilt(element: HTMLElement, tilt: Tilt) {
  element.style.transform = isSettled(tilt)
    ? ''
    : `rotateX(${tilt.rotateXDeg.toFixed(2)}deg) rotateY(${tilt.rotateYDeg.toFixed(2)}deg)`
}

export function useTilt<T extends HTMLElement>(maxTiltDeg: number) {
  const trackingAreaRef = useRef<T>(null)
  const tiltedElementRef = useRef<T>(null)
  const targetTilt = useRef(FLAT)
  const currentTilt = useRef(FLAT)

  useEffect(() => {
    if (isTiltDisabled()) return

    let frameId = 0
    const renderFrame = () => {
      currentTilt.current = easeToward(currentTilt.current, targetTilt.current)
      const tiltedElement = tiltedElementRef.current
      if (tiltedElement) applyTilt(tiltedElement, currentTilt.current)
      frameId = requestAnimationFrame(renderFrame)
    }
    frameId = requestAnimationFrame(renderFrame)
    return () => cancelAnimationFrame(frameId)
  }, [])

  const trackPointer = useCallback(
    (pointer: React.MouseEvent) => {
      const trackingArea = trackingAreaRef.current
      if (!trackingArea || isTiltDisabled()) return
      targetTilt.current = tiltTowardPointer(trackingArea, pointer, maxTiltDeg)
    },
    [maxTiltDeg],
  )

  const resetTilt = useCallback(() => {
    targetTilt.current = FLAT
  }, [])

  return { trackingAreaRef, tiltedElementRef, trackPointer, resetTilt }
}
