import type { Dictionary } from '@/i18n/types'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/shared/constants'
import { Github, Telegram, Mail } from 'lucide-react'

type FooterProps = {
  dict: Dictionary
  /** Extra Tailwind / CSS classes */
  className?: string
}

const socialIcons: Record<string, React.ReactNode> = {
  GitHub: <Github size={16} />,
  Telegram: <Telegram size={16} />,
}

export const Footer = ({ dict, className = '' }: FooterProps) => {
  const { footer } = dict

  return (
    <footer className={`border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 ${className}`}>
      <div className="mx-auto max-w-5xl px-4 py-10">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          {/* Brand & Description */}
          <div>
            <p className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
              {SITE_CONFIG.name}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">
              {footer.description}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center size-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {socialIcons[link.label] || null}
              </a>
            ))}
            {/* Email link */}
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              aria-label="Email"
              className="inline-flex items-center justify-center size-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Mail size={16} />
            </a>
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
