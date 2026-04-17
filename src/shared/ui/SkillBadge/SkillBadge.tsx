'use client'

import * as LucideIcons from 'lucide-react'
import type { Skill } from '@/shared/types'

interface SkillBadgeProps {
  skill: Skill
  className?: string
}

export const SkillBadge = ({ skill, className = '' }: SkillBadgeProps) => {
  // Get the icon component dynamically from lucide-react
  const IconComponent = skill.iconName 
    ? (LucideIcons[skill.iconName as keyof typeof LucideIcons] as React.ComponentType<{ size: number }>)
    : null

  return (
    <a
      href={skill.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
        text-neutral-700 dark:text-neutral-300
        bg-neutral-100 dark:bg-neutral-800
        hover:bg-neutral-200 dark:hover:bg-neutral-700
        transition-colors cursor-pointer
        ${className}
      `}
    >
      {IconComponent && <IconComponent size={16} />}
      {skill.label}
    </a>
  )
}
