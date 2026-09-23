import { useTilt } from '../hooks/useTilt'

const MAX_TILT_DEG = 45

export function ScriptPreview() {
  const { trackingAreaRef, tiltedElementRef, trackPointer, resetTilt } = useTilt<HTMLDivElement>(MAX_TILT_DEG)

  return (
    <div
      ref={trackingAreaRef}
      className="flex w-full items-center justify-center [perspective:600px]"
      onMouseMove={trackPointer}
      onMouseLeave={resetTilt}
    >
      <div
        ref={tiltedElementRef}
        className="will-change-transform rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src="/Preview.png"
          alt="Aurora Reborn script interface preview"
          draggable={false}
          className="block max-h-[calc(100svh-8rem)] w-full rounded-2xl object-contain"
        />
      </div>
    </div>
  )
}
