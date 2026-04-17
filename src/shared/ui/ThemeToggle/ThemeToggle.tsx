'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Emoji } from '../Emoji'

interface ThemeToggleProps {
  className?: string
}

/**
 * Toggles between light and dark theme.
 * Requires ThemeProvider (next-themes) in the layout.
 */
export const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className={`size-9 rounded-lg ${className}`} aria-hidden />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        inline-flex items-center justify-center size-9 rounded-lg
        text-neutral-600 dark:text-neutral-400
        hover:bg-neutral-100 dark:hover:bg-neutral-800
        transition-colors duration-150 cursor-pointer
        ${className}
      `}
    >
      <Emoji name={isDark ? 'sun' : 'moon'} size={20} />
    </button>
  )
}
