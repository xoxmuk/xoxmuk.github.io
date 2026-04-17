import type { Dictionary } from '@/i18n/types'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/shared/constants'
import { Emoji } from '@/shared/ui'

type FooterProps = {
  dict: Dictionary
  /** Extra Tailwind / CSS classes */
  className?: string
}

export const Footer = ({ dict, className = '' }: FooterProps) => {
  const { footer } = dict

  return (
    <footer className={`border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 ${className}`}>
      <div className="mx-auto max-w-5xl px-4 py-10">

        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div className="sm:col-span-1">
            <p className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
              {SITE_CONFIG.name}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
              {footer.description}
            </p>
            {/* Social icons */}
            <div className="flex gap-2 mt-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center size-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <Emoji name={link.icon} size={16} alt={link.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
              {footer.community}
            </p>
            <ul className="space-y-2">
              {footer.community_items.map((item) => (
                <li key={item}>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
              {footer.support_title}
            </p>
            <ul className="space-y-2">
              {footer.support_items.map((item) => (
                <li key={item}>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400 dark:text-neutral-500">
          <p>{footer.copyright}</p>
          <p>{footer.disclaimer}</p>
        </div>

      </div>
    </footer>
  )
}
