import { BookOpen } from 'lucide-react'
import type { ReactNode } from 'react'
import { ThemeToggle } from './ThemeToggle'

export function NoteScreen({
  title,
  iconClass = 'icon-english-notes',
  children,
}: {
  title: string
  iconClass?: string
  children: ReactNode
}) {
  return (
    <div className="screen">
      <header className="top">
        <div className="header-row">
          <span className={`menu-icon header-topic-icon ${iconClass}`} aria-hidden>
            <BookOpen size={22} strokeWidth={2.35} />
          </span>
          <h1 className="top-title">{title}</h1>
          <ThemeToggle />
        </div>
        <hr className="header-divider" />
      </header>
      <div className="screen-body">{children}</div>
    </div>
  )
}