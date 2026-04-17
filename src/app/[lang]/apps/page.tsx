import type { Metadata } from 'next'
import { getDictionary } from '@/i18n'
import { Emoji, Badge } from '@/shared/ui'
import { PROJECTS, APP_CATEGORIES } from '@/shared/constants'
import type { Dictionary } from '@/i18n/types'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return { title: dict.apps.title }
}

// ─── Project card ──────────────────────────────────────────────────────────
// Extract to src/widgets/ProjectCard if it grows
function ProjectCard({
  project,
  dict,
  className = '',
}: {
  project: typeof PROJECTS[number]
  dict: Dictionary
  className?: string
}) {
  const { apps } = dict
  const title = apps[project.titleKey as keyof typeof apps] as string
  const desc  = apps[project.descKey  as keyof typeof apps] as string

  return (
    <article
      className={`
        group relative flex flex-col gap-4 p-5 rounded-2xl
        border border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900
        hover:border-neutral-400 dark:hover:border-neutral-600
        hover:shadow-md dark:hover:shadow-neutral-900
        transition-all duration-200
        ${className}
      `}
    >
      {/* NEW badge */}
      {project.isNew && (
        <Badge variant="new" className="absolute top-4 right-4">
          NEW
        </Badge>
      )}

      {/* Icon */}
      <span className="size-12 flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <Emoji name={project.emoji} size={28} />
      </span>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <h3 className="font-semibold text-neutral-900 dark:text-white">{title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="default" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* View link */}
      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors mt-1"
        >
          <Emoji name="link" size={12} />
          {apps.view_label}
        </a>
      )}
    </article>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function AppsPage({ params }: Props) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const { apps } = dict

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 space-y-10">

      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <Emoji name="rocket" size={28} />
          {apps.title}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400">{apps.subtitle}</p>
      </header>

      {/* Grid by categories — add/remove projects and categories in src/shared/constants/index.ts */}
      {Object.entries(APP_CATEGORIES).map(([categoryKey, categoryInfo]) => {
        const categoryProjects = PROJECTS.filter((p) => p.category === categoryKey)
        if (categoryProjects.length === 0) return null

        return (
          <section key={categoryKey} className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
              <Emoji name={categoryInfo.emoji} size={24} />
              {categoryInfo.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryProjects.map((project) => (
                <ProjectCard key={project.id} project={project} dict={dict} />
              ))}
            </div>
          </section>
        )
      })}

    </div>
  )
}
