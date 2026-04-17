import type { Dictionary } from '@/i18n/types'
import { ThemeToggle } from '@/shared/ui'
import { SITE_CONFIG } from '@/shared/constants'
import { headerSections } from '../constants'
import { LanguageSwitcher } from './LanguageSwitcher'

type HeaderProps = {
  dict: Dictionary
  lang: string
  /** Extra Tailwind / CSS classes */
  className?: string
}

export const Header = ({ dict, lang, className = '' }: HeaderProps) => {
  const sections = headerSections(dict)

  return (
    <header className={`sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md ${className}`}>
      <section className="mx-auto max-w-5xl px-4 h-14 flex items-center gap-4">

        {/* Logo */}
        <a
          href={`/${lang}`}
          className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white hover:opacity-80 transition-opacity mr-auto"
        >
          {SITE_CONFIG.name}
        </a>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          {Object.entries(sections)
            .filter(([, section]) => !section.disabled)
            .map(([key, section]) => (
              <a
                key={key}
                href={`/${lang}/${key}`}
                className="px-3 py-1.5 text-sm font-medium rounded-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {section.label}
              </a>
            ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageSwitcher currentLang={lang} />
        </div>

      </section>
    </header>
  )
}
