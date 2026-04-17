import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '@/i18n'
import { Avatar, Button, Emoji, Badge, SkillBadge } from '@/shared/ui'
import { SITE_CONFIG, SKILLS, SOCIAL_LINKS } from '@/shared/constants'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return { title: dict.meta.title, description: dict.meta.description }
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const { home } = dict

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-24">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-8">

        <Avatar
          src={SITE_CONFIG.avatarPath}
          alt={SITE_CONFIG.name}
          size="2xl"
          className="shrink-0"
        />

        <div className="text-center sm:text-left space-y-4 pt-2">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white flex items-center gap-2 justify-center sm:justify-start">
              <Emoji name="wave" size={36} />
              {home.greeting}
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 font-medium">
              {home.role}
            </p>
          </div>

          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
            {home.bio}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start pt-1">
            <Link href={`/${lang}/apps`}>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Emoji name="rocket" size={16} />}
              >
                {home.cta_projects}
              </Button>
            </Link>
            <Link href={`/${lang}/about`}>
              <Button variant="outline" size="md">
                {home.cta_about}
              </Button>
            </Link>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Emoji name={link.icon} size={14} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
          <Emoji name="sparkles" size={20} />
          {home.skills_title}
        </h2>

        <div className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <SkillBadge key={skill.label} skill={skill} />
          ))}
        </div>
      </section>

    </div>
  )
}
