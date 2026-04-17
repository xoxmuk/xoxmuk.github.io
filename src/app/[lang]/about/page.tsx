import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { Avatar, Button, Emoji, Badge } from '@/shared/ui'
import { SITE_CONFIG, SKILLS, SOCIAL_LINKS } from '@/shared/constants'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return { title: dict.about.title }
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const { about } = dict

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-16">

      {/* ── Profile ───────────────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row gap-8 items-start">

        <Avatar
          src={SITE_CONFIG.avatarPath}
          alt={SITE_CONFIG.name}
          size="xl"
          className="shrink-0 mx-auto sm:mx-0"
        />

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
              {about.title}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {SITE_CONFIG.handle}
            </p>
          </div>

          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            {about.bio_1}
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            {about.bio_2}
          </p>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
          <Emoji name="brain" size={20} />
          {about.skills_title}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SKILLS.map((skill) => (
            <div
              key={skill.label}
              className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              <span className="size-9 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0">
                <Emoji name={skill.emoji} size={20} />
              </span>
              <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8 text-center space-y-4">
        <Emoji name="mail" size={32} className="mx-auto" />
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          {about.contact_title}
        </h2>
        <div className="flex flex-wrap justify-center gap-3 pt-1">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Emoji name={link.icon} size={14} />}
              >
                {link.label}
              </Button>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
