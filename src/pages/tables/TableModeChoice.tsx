import { BookOpen, PencilLine } from 'lucide-react'
import { Choice } from '../../components/Choice'

export function TableModeChoice({
  mode,
  onModeChange,
}: {
  mode: 'read' | 'quiz'
  onModeChange: (mode: 'read' | 'quiz') => void
}) {
  return (
    <Choice
      label="Mode"
      value={mode}
      options={[
        { value: 'read' as const, label: 'Read', icon: <BookOpen size={18} strokeWidth={2.25} aria-hidden /> },
        { value: 'quiz' as const, label: 'Practice', icon: <PencilLine size={18} strokeWidth={2.25} aria-hidden /> },
      ]}
      onChange={onModeChange}
    />
  )
}