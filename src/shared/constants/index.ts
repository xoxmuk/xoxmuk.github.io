import type { SocialLink, Skill, Project } from '@/shared/types'

// ─── Site config ───────────────────────────────────────────────────────────
/**
 * Change these to customise the site globally.
 * name is used in Header, Footer, and throughout the site.
 */
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
/** Shown in Footer and About page (Email is only in footer) */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub',    href: 'https://github.com/xoxmuk',   icon: 'link' },
  { label: 'Telegram',  href: 'https://t.me/xoxmuk',         icon: 'globe' },
]

// ─── Skills / Technologies ─────────────────────────────────────────────────
/**
 * Displayed on the Home page and About page
 * iconName must be a valid lucide-react icon name
 * href is optional - if provided, the skill becomes a clickable link
 */
export const SKILLS: Skill[] = [
  { label: 'TypeScript', emoji: 'code',      color: '#3178c6', iconName: 'Code2', href: 'https://www.typescriptlang.org/' },
  { label: 'React',      emoji: 'sparkles',  color: '#61dafb', iconName: 'Zap', href: 'https://react.dev/' },
  { label: 'Next.js',    emoji: 'lightning', color: '#000000', iconName: 'Zap', href: 'https://nextjs.org/' },
  { label: 'Tailwind',   emoji: 'palette',   color: '#38bdf8', iconName: 'Palette', href: 'https://tailwindcss.com/' },
  { label: 'Node.js',    emoji: 'tools',     color: '#339933', iconName: 'Cpu', href: 'https://nodejs.org/' },
  { label: 'Telegram',   emoji: 'globe',     color: '#0088cc', iconName: 'Send', href: 'https://telegram.org/' },
]

// ─── Projects / Mini Apps ──────────────────────────────────────────────────
/**
 * Add/remove/edit projects here — the Apps page renders this list.
 * titleKey / descKey must match keys in the i18n dictionaries.
 * 
 * To add a new category of mini-apps, create a new object in APP_CATEGORIES
 * and add projects to it. Each project will be grouped by category.
 */

// Define your mini-app categories here
export const APP_CATEGORIES = {
  'Featured': {
    label: 'Featured',
    emoji: 'star' as const,
  },
  'Tools': {
    label: 'Tools',
    emoji: 'tools' as const,
  },
  'Utilities': {
    label: 'Utilities',
    emoji: 'code' as const,
  },
} as const

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    emoji: 'rocket',
    titleKey: 'project1Title',
    descKey: 'project1Desc',
    tags: ['TypeScript', 'Next.js', 'Telegram'],
    isNew: true,
    category: 'Featured',
  },
  {
    id: 'project-2',
    emoji: 'brain',
    titleKey: 'project2Title',
    descKey: 'project2Desc',
    tags: ['React', 'Node.js'],
    category: 'Tools',
  },
  {
    id: 'project-3',
    emoji: 'gem',
    titleKey: 'project3Title',
    descKey: 'project3Desc',
    tags: ['TypeScript', 'Tailwind'],
    category: 'Utilities',
  },
]
