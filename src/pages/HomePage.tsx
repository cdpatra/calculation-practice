import { BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '../components/ThemeToggle'
import { loadStats } from '../lib/stats'
import { TOPIC_MENU } from '../lib/topicMenu'

export default function HomePage() {
  const stats = loadStats()
  const attempted = TOPIC_MENU.reduce((sum, item) => sum + stats[item.topic].attempted, 0)
  const correct = TOPIC_MENU.reduce((sum, item) => sum + stats[item.topic].correct, 0)
  const best = TOPIC_MENU.reduce((max, item) => Math.max(max, stats[item.topic].bestStreak), 0)
  const percent = attempted ? Math.round((correct / attempted) * 100) : 0

  return (
    <div className="screen">
      <div className="home-top">
        <div className="header-row">
          <h1 className="home-title">Calculation Practice</h1>
          <ThemeToggle />
        </div>
        <hr className="header-divider" />
      </div>
      <p className="note">Infinite questions for calculation speed. Made for a phone. No account.</p>
      {attempted > 0 ? (
        <p className="summary">
          <span className="stat stat-time">{attempted} solved</span>
          <span className={percent >= 80 ? 'stat stat-ok' : percent >= 50 ? 'stat stat-streak' : 'stat stat-bad'}>
            {percent}% correct
          </span>
          <span className={best > 0 ? 'stat stat-streak' : 'stat stat-muted'}>best streak {best}</span>
        </p>
      ) : null}
      <nav className="menu">
        {TOPIC_MENU.map((item) => {
          const topicStats = stats[item.topic]
          const topicPercent = topicStats.attempted
            ? Math.round((topicStats.correct / topicStats.attempted) * 100)
            : 0
          return (
            <Link key={item.href} to={item.href} className="menu-btn">
              <span className={`menu-icon icon-${item.iconClass}`} aria-hidden>
                <item.icon size={22} strokeWidth={2.35} />
              </span>
              <span className="menu-body">
                <strong>{item.title}</strong>
                <span className="desc">{item.text}</span>
                {topicStats.attempted > 0 ? (
                  <span className="meta">
                    <span className="stat stat-time">{topicStats.attempted} solved</span>
                    <span
                      className={
                        topicPercent >= 80 ? 'stat stat-ok' : topicPercent >= 50 ? 'stat stat-streak' : 'stat stat-bad'
                      }
                    >
                      {topicPercent}%
                    </span>
                  </span>
                ) : null}
              </span>
            </Link>
          )
        })}
      </nav>

      <section className="home-section" aria-labelledby="english-notes-heading">
        <h2 id="english-notes-heading" className="home-section-title">
          English Notes
        </h2>
        <nav className="menu">
          <Link to="/english-notes" className="menu-btn">
            <span className="menu-icon icon-english-notes" aria-hidden>
              <BookOpen size={22} strokeWidth={2.35} />
            </span>
            <span className="menu-body">
              <strong>English Notes</strong>
              <span className="desc">Grammar and language topics</span>
            </span>
          </Link>
        </nav>
      </section>

      <p className="footnote">Scores stay on this phone.</p>
    </div>
  )
}
