import type { Dictionary } from './types'

export const locales = ['ru', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ru'

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  ru: () => import('./dictionaries/ru.json').then((m) => m.default as Dictionary),
  en: () => import('./dictionaries/en.json').then((m) => m.default as Dictionary),
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  const loader = loaders[locale as Locale] ?? loaders[defaultLocale]
  return loader()
}
