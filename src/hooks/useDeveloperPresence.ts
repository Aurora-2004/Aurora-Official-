import { useEffect, useState } from 'react'
import { type DiscordPresence, fetchDiscordPresence } from '../services/lanyardClient'
import { DEVELOPER_DISCORD_ID } from '../siteConfig'

export function useDeveloperPresence() {
  const [presence, setPresence] = useState<DiscordPresence | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchDiscordPresence(DEVELOPER_DISCORD_ID, controller.signal)
      .then(setPresence)
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        console.warn('Developer credit unavailable:', error)
      })

    return () => controller.abort()
  }, [])

  return presence
}
