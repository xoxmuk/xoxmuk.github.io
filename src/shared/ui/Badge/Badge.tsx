import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'outline' | 'success' | 'warning' | 'new'

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
  outline: 'border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300',
  success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  new:     'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
}

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

/** Small inline label — use for tech tags, "NEW" markers, etc. */
export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => (
  <span
    className={`
      inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
      ${variantStyles[variant]}
      ${className}
    `}
  >
    {children}
  </span>
)
