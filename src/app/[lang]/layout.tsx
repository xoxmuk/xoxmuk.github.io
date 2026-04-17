import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { getDictionary, locales } from '@/i18n'
import type { Locale } from '@/i18n'

import '@/shared/styles/index.css'

type Props = {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return {
    title: {
      template: `%s | ${dict.meta.title}`,
      default: dict.meta.title,
    },
    description: dict.meta.description,
    creator: 'xoxmuk',
    publisher: 'xoxmuk',
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
  }
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params

  if (!locales.includes(lang as Locale)) {
    notFound()
  }

  const dict = await getDictionary(lang)

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-950">
      <Header dict={dict} lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} />
    </div>
  )
}
