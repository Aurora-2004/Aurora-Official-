const LANYARD_USERS_ENDPOINT = 'https://api.lanyard.rest/v1/users'
const DISCORD_CDN = 'https://cdn.discordapp.com'
const DISCORD_PROFILE_BASE_URL = 'https://discord.com/users'
const AVATAR_SIZE_PX = 128
const ANIMATED_AVATAR_PREFIX = 'a_'
const DEFAULT_AVATAR_COUNT = 6n
const SNOWFLAKE_TIMESTAMP_SHIFT = 22n

export type DiscordStatus = 'online' | 'idle' | 'dnd' | 'offline'

export interface DiscordPresence {
  displayName: string
  avatarUrl: string
  status: DiscordStatus
  profileUrl: string
}

interface LanyardDiscordUser {
  id: string
  username: string
  global_name: string | null
  avatar: string | null
}

interface LanyardUserResponse {
  success: boolean
  data?: {
    discord_status: DiscordStatus
    discord_user: LanyardDiscordUser
  }
}

export class LanyardRequestError extends Error {
  override name = 'LanyardRequestError'
}

function customAvatarUrl(userId: string, avatarHash: string) {
  const extension = avatarHash.startsWith(ANIMATED_AVATAR_PREFIX) ? 'gif' : 'png'
  return `${DISCORD_CDN}/avatars/${userId}/${avatarHash}.${extension}?size=${AVATAR_SIZE_PX}`
}

function defaultAvatarUrl(userId: string) {
  const avatarIndex = (BigInt(userId) >> SNOWFLAKE_TIMESTAMP_SHIFT) % DEFAULT_AVATAR_COUNT
  return `${DISCORD_CDN}/embed/avatars/${avatarIndex}.png`
}

function avatarUrlFor(user: LanyardDiscordUser) {
  return user.avatar ? customAvatarUrl(user.id, user.avatar) : defaultAvatarUrl(user.id)
}

export async function fetchDiscordPresence(userId: string, signal: AbortSignal): Promise<DiscordPresence> {
  const response = await fetch(`${LANYARD_USERS_ENDPOINT}/${userId}`, { signal })
  if (!response.ok) {
    throw new LanyardRequestError(`Lanyard returned HTTP ${response.status} for user ${userId}`)
  }

  const body = (await response.json()) as LanyardUserResponse
  if (!body.success || !body.data) {
    throw new LanyardRequestError(`Lanyard is not tracking user ${userId}`)
  }

  const { discord_user: user, discord_status: status } = body.data
  return {
    displayName: user.global_name || user.username,
    avatarUrl: avatarUrlFor(user),
    status,
    profileUrl: `${DISCORD_PROFILE_BASE_URL}/${user.id}`,
  }
}
