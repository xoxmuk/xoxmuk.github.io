'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
}

/**
 * Toggles between light and dark theme with smooth animation.
 * Requires ThemeProvider (next-themes) in the layout.
 */
export const ThemeToggle = ({ className = '' }: ThemeToggleProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className={`size-10 rounded-lg ${className}`} aria-hidden />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`
        relative inline-flex items-center justify-center size-10 rounded-lg
        text-neutral-600 dark:text-neutral-400
        hover:bg-neutral-100 dark:hover:bg-neutral-800
        transition-all duration-300 cursor-pointer
        ${className}
      `}
    >
      <Sun
        size={20}
        className="absolute transition-all duration-300 rotate-0 scale-100 opacity-100 dark:rotate-90 dark:scale-0 dark:opacity-0"
      />
      <Moon
        size={20}
        className="absolute transition-all duration-300 -rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  )
}
