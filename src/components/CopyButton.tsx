import { useEffect, useRef, useState } from 'react'

const COPIED_RESET_MS = 2000

interface CopyButtonProps {
  text: string
  className?: string
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" className="h-4 w-4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V5a2 2 0 012-2h9a2 2 0 012 2v9a2 2 0 01-2 2h-2M5 7h9a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const resetTimerId = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(resetTimerId.current), [])

  async function copyTextToClipboard() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.clearTimeout(resetTimerId.current)
    resetTimerId.current = window.setTimeout(() => setCopied(false), COPIED_RESET_MS)
  }

  const label = copied ? 'Copied' : 'Copy loadstring'

  return (
    <button
      type="button"
      onClick={() => void copyTextToClipboard()}
      className={`group relative inline-flex min-h-12 cursor-pointer items-center overflow-hidden rounded-lg border border-white/10 bg-secondary px-6 text-base font-medium text-white transition-colors hover:border-white/20 ${className}`}
    >
      <span className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-tertiary ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-[100]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {label}
        </span>
      </span>
      <span className="absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        {copied ? <CheckIcon /> : <CopyIcon />}
        {label}
      </span>
    </button>
  )
}
