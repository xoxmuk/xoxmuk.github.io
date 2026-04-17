'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Globe, Check } from 'lucide-react'
import { locales } from '@/i18n'
import type { Locale } from '@/i18n'

const labels: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
}

interface LanguageSwitcherProps {
  currentLang: string
  /** Extra Tailwind / CSS classes */
  className?: string
}

export const LanguageSwitcher = ({ currentLang, className = '' }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (locale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = locale
    const newPath = segments.join('/')
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`
    router.push(newPath)
    setIsOpen(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        className={`
          inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
          text-neutral-700 dark:text-neutral-300
          hover:bg-neutral-100 dark:hover:bg-neutral-800
          transition-all duration-200
          ${isOpen ? 'bg-neutral-100 dark:bg-neutral-800' : ''}
        `}
      >
        <Globe size={18} />
        <span>{labels[currentLang as Locale]}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-lg z-50">
          <div className="py-1">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`
                  w-full px-4 py-2 text-sm text-left flex items-center gap-2 transition-colors
                  ${locale === currentLang
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }
                `}
              >
                <span className="flex-1">{labels[locale]}</span>
                {locale === currentLang && <Check size={16} className="text-green-500" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
