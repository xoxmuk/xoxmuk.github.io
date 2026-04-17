# Customization Guide

This guide explains how to easily customize your portfolio using centralized configuration files.

## Quick Start

### Change Your Name
Your name appears throughout the site (header, footer, etc.). Change it in **one place**:

**File:** `src/shared/constants/index.ts`
```ts
export const SITE_CONFIG = {
  name: 'your-name-here', // ← Change this
  // ... rest of config
}
```

### Add/Edit Social Links
**File:** `src/shared/constants/index.ts`

```ts
export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub',    href: 'https://github.com/yourname',   icon: 'link' },
  { label: 'Telegram',  href: 'https://t.me/yourname',         icon: 'globe' },
  // Email is only shown in the footer - see SITE_CONFIG.email
]
```

**Note:** Email is configured in `SITE_CONFIG.email` and appears automatically in the footer.

### Add/Edit Technologies/Skills
Technologies are clickable badges with links to the official websites.

**File:** `src/shared/constants/index.ts`

```ts
export const SKILLS: Skill[] = [
  { 
    label: 'TypeScript',
    emoji: 'code',
    color: '#3178c6',
    iconName: 'Code2',      // ← lucide-react icon name
    href: 'https://www.typescriptlang.org/'  // ← Link to official site
  },
  // Add more technologies...
]
```

**Available lucide-react icons:** [Browse all icons](https://lucide.dev)

### Add/Edit Mini-Apps with Categories
Create categories and group your projects/mini-apps.

**File:** `src/shared/constants/index.ts`

#### Step 1: Define Categories
```ts
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
  // Add more categories...
} as const
```

#### Step 2: Add Projects to Categories
```ts
export const PROJECTS: Project[] = [
  {
    id: 'my-app-1',
    emoji: 'rocket',
    titleKey: 'project1Title',          // ← Key from i18n dictionaries
    descKey: 'project1Desc',            // ← Key from i18n dictionaries
    tags: ['TypeScript', 'React'],
    category: 'Featured',               // ← Must match a category key
    href: 'https://link-to-app.com',
    isNew: true,
  },
  // Add more projects...
]
```

**Note:** `titleKey` and `descKey` must match keys in your i18n translation files:
- `src/i18n/dictionaries/ru.json`
- `src/i18n/dictionaries/en.json`

## Component Updates

### Theme Toggle
The theme toggle now has smooth animations with rotating Sun/Moon icons using lucide-react.

**File:** `src/shared/ui/ThemeToggle/ThemeToggle.tsx`

### Language Switcher
Changed from inline buttons to a dropdown menu with language names and checkmark for current language.

**File:** `src/widgets/Header/ui/LanguageSwitcher.tsx`

### Skills/Technologies Display
Skills now use lucide-react icons and are clickable links.

**File:** `src/shared/ui/SkillBadge/SkillBadge.tsx`

## Configuration Files Reference

| File | Purpose |
|------|---------|
| `src/shared/constants/index.ts` | Main portfolio configuration (name, socials, skills, projects) |
| `src/shared/config/index.ts` | Alternative config file (currently unused, for future expansion) |
| `src/shared/types/index.ts` | TypeScript types for Skill and Project |
| `src/i18n/dictionaries/*.json` | Translations for UI text and project titles/descriptions |

## Design System

All new components use lucide-react icons instead of emoji images:
- **Icon Names:** Use valid lucide-react icon names from [lucide.dev](https://lucide.dev)
- **Smooth Animations:** CSS transitions are configured in `src/shared/styles/root.css`
- **Dark Mode:** Full dark mode support using CSS variables

## Footer Content

The footer now shows:
- **Name** (from `SITE_CONFIG.name`)
- **Description** (from i18n)
- **Social Icons** (GitHub, Telegram from `SOCIAL_LINKS`)
- **Email Icon** (from `SITE_CONFIG.email`)
- **Copyright & Disclaimer** (from i18n)

Email link is **only in footer**, not in the header.

---

For more help, check the source code comments or reach out!
