import { SITE_BRAND } from '../siteConfig'
import { DiscordInviteLink } from './DiscordInviteLink'

const NAV_LINKS = [
  { label: 'Executors', href: '/executors' },
  { label: 'Terms', href: '/terms' },
]

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-primary/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-3 px-5 sm:px-8 lg:px-12">
        <a href="/" className="flex min-w-0 items-center gap-2 truncate text-base font-bold tracking-wide text-white sm:text-lg">
          <span className="truncate">
            {SITE_BRAND}
          </span>
        </a>
        <div className="flex shrink-0 items-center gap-3 sm:gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-neutral-400 transition hover:text-white">
              {link.label}
            </a>
          ))}
          <DiscordInviteLink />
        </div>
      </div>
    </nav>
  )
}
