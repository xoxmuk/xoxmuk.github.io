import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { ButtonVariant, ButtonSize } from '@/shared/types'

// ─── Style maps ────────────────────────────────────────────────────────────
// Edit these maps to change every button at once
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 ' +
    'hover:bg-neutral-700 dark:hover:bg-neutral-200 ' +
    'active:scale-95 shadow-sm',
  secondary:
    'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white ' +
    'hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95',
  ghost:
    'text-neutral-700 dark:text-neutral-300 ' +
    'hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-95',
  outline:
    'border border-neutral-300 dark:border-neutral-600 ' +
    'text-neutral-900 dark:text-white ' +
    'hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:scale-95 shadow-sm',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8  px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2.5',
}

// ─── Component ─────────────────────────────────────────────────────────────
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Node rendered before the label (e.g. <Emoji name="rocket" />) */
  leftIcon?: ReactNode
  /** Node rendered after the label */
  rightIcon?: ReactNode
  /** Shows a loading spinner and disables the button */
  loading?: boolean
  /** Extra Tailwind / CSS classes — appended after variant/size classes */
  className?: string
  children?: ReactNode
}

/**
 * Versatile button with variant, size, icon slots, and loading state.
 *
 * @example
 * <Button variant="primary" leftIcon={<Emoji name="rocket" />}>Launch</Button>
 * <Button variant="outline" size="sm" className="rounded-full">Follow</Button>
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  className = '',
  disabled,
  children,
  ...rest
}: ButtonProps) => (
  <button
    disabled={disabled || loading}
    className={`
      inline-flex items-center justify-center rounded-lg font-medium
      transition-all duration-150 cursor-pointer select-none
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:focus-visible:outline-white
      disabled:opacity-50 disabled:pointer-events-none
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `}
    {...rest}
  >
    {loading ? (
      <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
    ) : (
      leftIcon
    )}
    {children}
    {!loading && rightIcon}
  </button>
)
