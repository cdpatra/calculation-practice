import type { ReactNode } from 'react'
import type { Topic } from '../lib/stats'
import { topicMeta } from '../lib/topicMenu'
import { ThemeToggle } from './ThemeToggle'

export function Screen({
  title,
  topic,
  children,
  footer,
}: {
  title: string
  topic: Topic
  children: ReactNode
  footer?: ReactNode
}) {
  const { icon: Icon, iconClass } = topicMeta(topic)

  return (
    <div className={footer ? 'screen screen-fixed' : 'screen'}>
      <header className="top">
        <div className="header-row">
          <span className={`menu-icon header-topic-icon icon-${iconClass}`} aria-hidden>
            <Icon size={22} strokeWidth={2.35} />
          </span>
          <h1 className="top-title">{title}</h1>
          <ThemeToggle />
        </div>
        <hr className="header-divider" />
      </header>
      <div className="screen-body">{children}</div>
      {footer}
    </div>
  )
}