import { useDeveloperPresence } from '../hooks/useDeveloperPresence'
import type { DiscordStatus } from '../services/lanyardClient'

const STATUS_DOT_COLOR: Record<DiscordStatus, string> = {
  online: '#23a55a',
  idle: '#f0b232',
  dnd: '#f23f43',
  offline: '#80848e',
}

export function Footer() {
  const developer = useDeveloperPresence()

  return (
    <footer className="flex shrink-0 items-center justify-center gap-4 border-t border-white/10 bg-black/25 px-4 py-3 sm:px-6">
      <p className="text-sm font-medium text-white">Made with 🤍 by</p>
      {developer && (
        <a
          href={developer.profileUrl}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2.5 text-sm font-medium text-white"
        >
          <span className="relative inline-flex">
            <img src={developer.avatarUrl} alt="" className="h-9 w-9 rounded-full" />
            <span
              className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-tertiary"
              style={{ background: STATUS_DOT_COLOR[developer.status] }}
            />
          </span>
          {developer.displayName}
        </a>
      )}
    </footer>
  )
}
