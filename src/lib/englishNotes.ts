const modules = import.meta.glob('../../english-notes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type EnglishNote = {
  slug: string
  title: string
  content: string
}

const NOTE_ICON_TONES = [
  'note-tone-0',
  'note-tone-1',
  'note-tone-2',
  'note-tone-3',
  'note-tone-4',
  'note-tone-5',
  'note-tone-6',
  'note-tone-7',
] as const

export function noteIconClass(slug: string): string {
  let hash = 0
  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash * 31 + slug.charCodeAt(index)) >>> 0
  }
  return NOTE_ICON_TONES[hash % NOTE_ICON_TONES.length]
}

function slugFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.md$/)
  return match?.[1] ?? path
}

/** Turn `parts-of-speech` or `subject_verb` into a readable UI title. */
export function slugToTitle(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

function buildCatalog(): EnglishNote[] {
  return Object.entries(modules)
    .map(([path, content]) => {
      const slug = slugFromPath(path)
      return { slug, title: slugToTitle(slug), content }
    })
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }))
}

let catalog: EnglishNote[] | null = null

export function listEnglishNotes(): EnglishNote[] {
  if (!catalog) catalog = buildCatalog()
  return catalog
}

export function getEnglishNote(slug: string | undefined): EnglishNote | null {
  if (!slug) return null
  return listEnglishNotes().find((note) => note.slug === slug) ?? null
}