import type { Dictionary } from '@/i18n/types'
import type { HeaderSectionType } from '../types'

interface HeaderSection {
  disabled?: boolean
  label: string
  width: number
}

export const headerSections = (
  dict: Dictionary
): Record<Exclude<HeaderSectionType, null>, HeaderSection> => ({
  about: { label: dict.header.sections.about, width: 704 },
  apps:  { label: dict.header.sections.apps,  width: 670 },
})
