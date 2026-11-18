import type { LucideIcon } from 'lucide-react'
import { Box, Divide, Minus, Plus, Square, Table2, X } from 'lucide-react'
import type { Topic } from './stats'

export type TopicMenuItem = {
  topic: Topic
  href: string
  title: string
  text: string
  icon: LucideIcon
  iconClass: string
}

export const TOPIC_MENU: TopicMenuItem[] = [
  {
    topic: 'addition',
    href: '/addition',
    title: 'Addition',
    icon: Plus,
    iconClass: 'addition',
    text: 'Two numbers, or a chain like 12 + 23 + 32 + 42 + 13',
  },
  {
    topic: 'subtraction',
    href: '/subtraction',
    title: 'Subtraction',
    icon: Minus,
    iconClass: 'subtraction',
    text: 'Two numbers. The answer stays positive.',
  },
  {
    topic: 'multiplication',
    href: '/multiplication',
    title: 'Multiplication',
    icon: X,
    iconClass: 'multiplication',
    text: 'Practice number-wise. Pick 12 and get 23 × 12, 322 × 12, 12312 × 12.',
  },
  {
    topic: 'division',
    href: '/division',
    title: 'Division',
    icon: Divide,
    iconClass: 'division',
    text: 'Exact division. Pick 12 and every question divides by 12.',
  },
  {
    topic: 'tables',
    href: '/tables',
    title: 'Tables',
    icon: Table2,
    iconClass: 'tables',
    text: 'Read tables from 1 to 30 in sections, then recall them.',
  },
  {
    topic: 'squares',
    href: '/squares',
    title: 'Squares',
    icon: Square,
    iconClass: 'squares',
    text: 'Squares from 1 to 50.',
  },
  {
    topic: 'cubes',
    href: '/cubes',
    title: 'Cubes',
    icon: Box,
    iconClass: 'cubes',
    text: 'Cubes from 1 to 30.',
  },
]

export function topicMeta(topic: Topic): TopicMenuItem {
  const item = TOPIC_MENU.find((entry) => entry.topic === topic)
  if (!item) throw new Error(`Unknown topic: ${topic}`)
  return item
}