// ─── Button ────────────────────────────────────────────────────────────────
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

// ─── Theme ─────────────────────────────────────────────────────────────────
export type Theme = 'light' | 'dark' | 'system'

// ─── Emoji ─────────────────────────────────────────────────────────────────
export type EmojiName =
  | 'heart'
  | 'star'
  | 'fire'
  | 'rocket'
  | 'code'
  | 'wave'
  | 'sparkles'
  | 'check'
  | 'arrow-right'
  | 'trophy'
  | 'globe'
  | 'tools'
  | 'brain'
  | 'lightning'
  | 'gem'
  | 'link'
  | 'mail'
  | 'moon'
  | 'sun'
  | 'palette'

// ─── Avatar ────────────────────────────────────────────────────────────────
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// ─── Social links ──────────────────────────────────────────────────────────
export interface SocialLink {
  label: string
  href: string
  icon: EmojiName
}

// ─── Project card ──────────────────────────────────────────────────────────
export interface Project {
  id: string
  emoji: EmojiName
  titleKey: string
  descKey: string
  tags: string[]
  href?: string
  isNew?: boolean
  category?: string // Category for grouping projects
}

// ─── Skill ─────────────────────────────────────────────────────────────────
export interface Skill {
  label: string
  emoji: EmojiName
  color?: string
  iconName?: string // lucide-react icon name
  href?: string // Optional link for clickable skills
}
