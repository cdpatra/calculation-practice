import { BookOpen, PencilLine } from 'lucide-react'
import { useCallback } from 'react'
import { Choice } from '../components/Choice'
import { Drill } from '../components/Drill'
import { Screen } from '../components/Screen'
import { makePythagoreanTripleQuestion } from '../lib/questions'
import { formatTriplet, PYTHAGOREAN_GROUPS } from '../lib/pythagoreanTriples'
import { coloredSheetRowClass } from '../lib/coloredSheet'
import { useSaved } from '../lib/useSaved'

function isMode(value: unknown): value is 'read' | 'quiz' {
  return value === 'read' || value === 'quiz'
}

export default function PythagoreanPage() {
  const title = 'Pythagorean Triplets'
  const [mode, setMode] = useSaved('ssc-pyth-mode', 'read' as 'read' | 'quiz', isMode)
  const makeQuestion = useCallback(() => makePythagoreanTripleQuestion(), [])

  const controls = (
    <Choice
      label="Mode"
      value={mode}
      options={[
        { value: 'read' as const, label: 'Read', icon: <BookOpen size={18} strokeWidth={2.25} aria-hidden /> },
        { value: 'quiz' as const, label: 'Practice', icon: <PencilLine size={18} strokeWidth={2.25} aria-hidden /> },
      ]}
      onChange={setMode}
    />
  )

  if (mode === 'quiz') {
    return (
      <Drill
        title={title}
        topic="pythagorean"
        revision="pythagorean"
        makeQuestion={makeQuestion}
        note="Fill in the missing number. Example: 3 , 4 , ? → 5."
        toolbar={controls}
      />
    )
  }

  return (
    <Screen title={title} topic="pythagorean">
      {controls}
      <p className="note">a² + b² = c². Each group starts from one primitive triplet and its multiples.</p>
      {PYTHAGOREAN_GROUPS.map((group) => (
        <section className="table-section" key={`${group.base.join('-')}`}>
          <h2 className="table-section-title">From {formatTriplet(group.base)}</h2>
          <div className="sheet sheet-colored">
            {group.triplets.map(([a, b, c], index) => (
              <div className={coloredSheetRowClass(index)} key={`${a}-${b}-${c}`}>
                <span>{formatTriplet([a, b, c])}</span>
                <span className="triplet-check">
                  {a}² + {b}² = {c}²
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </Screen>
  )
}