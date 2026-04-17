import type { SocialLink, Skill, Project } from '@/shared/types'

// ─── Site config ───────────────────────────────────────────────────────────
/** Change these to customise the site globally */
export const SITE_CONFIG = {
  name: 'xoxmuk',
  url: 'https://xoxmuk.github.io',
  handle: '@xoxmuk',
  email: 'xoxmuk@example.com',
  avatarPath: '/avatars/xoxmuk.png',
} as const

// ─── Emoji ─────────────────────────────────────────────────────────────────
/** Default emoji display size in px */
export const EMOJI_SIZE = 24

// ─── Social links ──────────────────────────────────────────────────────────
/** Shown in Header, Footer, and About page */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub',    href: 'https://github.com/xoxmuk',   icon: 'link' },
  { label: 'Telegram',  href: 'https://t.me/xoxmuk',         icon: 'globe' },
  { label: 'Email',     href: 'mailto:xoxmuk@example.com',   icon: 'mail' },
]

// ─── Skills ────────────────────────────────────────────────────────────────
/** Displayed on the Home page and About page */
export const SKILLS: Skill[] = [
  { label: 'TypeScript', emoji: 'code',      color: '#3178c6' },
  { label: 'React',      emoji: 'sparkles',  color: '#61dafb' },
  { label: 'Next.js',    emoji: 'lightning', color: '#000000' },
  { label: 'Tailwind',   emoji: 'palette',   color: '#38bdf8' },
  { label: 'Node.js',    emoji: 'tools',     color: '#339933' },
  { label: 'Telegram',   emoji: 'globe',     color: '#0088cc' },
]

// ─── Projects ──────────────────────────────────────────────────────────────
/**
 * Add/remove/edit projects here — the Apps page renders this list.
 * titleKey / descKey must match keys in the i18n dictionaries.
 */
export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    emoji: 'rocket',
    titleKey: 'project1Title',
    descKey: 'project1Desc',
    tags: ['TypeScript', 'Next.js', 'Telegram'],
    isNew: true,
  },
  {
    id: 'project-2',
    emoji: 'brain',
    titleKey: 'project2Title',
    descKey: 'project2Desc',
    tags: ['React', 'Node.js'],
  },
  {
    id: 'project-3',
    emoji: 'gem',
    titleKey: 'project3Title',
    descKey: 'project3Desc',
    tags: ['TypeScript', 'Tailwind'],
  },
]
