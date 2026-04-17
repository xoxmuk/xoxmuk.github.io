export type Dictionary = {
  meta: {
    title: string
    description: string
  }
  header: {
    sections: {
      about: string
      apps: string
    }
  }
  footer: {
    description: string
    community: string
    community_items: string[]
    support_title: string
    support_items: string[]
    copyright: string
    disclaimer: string
  }
  // ─── Home page ─────────────────────────────────────────────────────────
  home: {
    greeting: string
    role: string
    bio: string
    cta_projects: string
    cta_about: string
    skills_title: string
  }
  // ─── About page ────────────────────────────────────────────────────────
  about: {
    title: string
    bio_1: string
    bio_2: string
    skills_title: string
    contact_title: string
    contact_cta: string
  }
  // ─── Apps page ─────────────────────────────────────────────────────────
  apps: {
    title: string
    subtitle: string
    // Project entries — keys match PROJECTS[*].titleKey / descKey
    project1Title: string
    project1Desc: string
    project2Title: string
    project2Desc: string
    project3Title: string
    project3Desc: string
    tags_label: string
    view_label: string
  }
}
