import { marked } from 'marked'
import { useMemo } from 'react'

marked.setOptions({
  gfm: true,
  breaks: true,
})

export function MarkdownBody({ source }: { source: string }) {
  const html = useMemo(() => marked.parse(source, { async: false }) as string, [source])

  return <article className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
}