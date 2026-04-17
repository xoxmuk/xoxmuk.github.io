'use client'

import { usePathname, useRouter } from 'next/navigation'
import { locales } from '@/i18n'
import type { Locale } from '@/i18n'

const labels: Record<Locale, string> = {
  ru: 'RU',
  en: 'EN',
}

interface LanguageSwitcherProps {
  currentLang: string
  /** Extra Tailwind / CSS classes */
  className?: string
}

export const LanguageSwitcher = ({ currentLang, className = '' }: LanguageSwitcherProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (locale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = locale
    const newPath = segments.join('/')
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`
    router.push(newPath)
  }

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          disabled={locale === currentLang}
          aria-label={`Switch language to ${locale}`}
          className={`
            px-2 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer
            ${locale === currentLang
              ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 cursor-default'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }
          `}
        >
          {labels[locale]}
        </button>
      ))}
    </div>
  )
}
