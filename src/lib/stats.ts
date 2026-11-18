export type Topic = 'addition' | 'subtraction' | 'multiplication' | 'division' | 'tables' | 'squares' | 'cubes'

export type TopicStats = {
  attempted: number
  correct: number
  bestStreak: number
  totalMs: number
}

const KEY = 'ssc-calc-stats-v1'

const TOPICS: Topic[] = ['addition', 'subtraction', 'multiplication', 'division', 'tables', 'squares', 'cubes']

function empty(): TopicStats {
  return { attempted: 0, correct: 0, bestStreak: 0, totalMs: 0 }
}

function asCount(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : 0
}

export function loadStats(): Record<Topic, TopicStats> {
  const stats = Object.fromEntries(TOPICS.map((topic) => [topic, empty()])) as Record<Topic, TopicStats>
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return stats
    const parsed = JSON.parse(raw) as Record<string, Partial<TopicStats>>
    for (const topic of TOPICS) {
      const item = parsed?.[topic]
      if (!item) continue
      stats[topic] = {
        attempted: asCount(item.attempted),
        correct: asCount(item.correct),
        bestStreak: asCount(item.bestStreak),
        totalMs: asCount(item.totalMs),
      }
    }
  } catch {
    return stats
  }
  return stats
}

export function recordResult(topic: Topic, correct: boolean, ms: number, streak: number) {
  const stats = loadStats()
  const current = stats[topic]
  current.attempted += 1
  if (correct) current.correct += 1
  current.totalMs += Math.max(0, ms)
  current.bestStreak = Math.max(current.bestStreak, streak)
  try {
    localStorage.setItem(KEY, JSON.stringify(stats))
  } catch {
    /* private mode or full storage */
  }
}
