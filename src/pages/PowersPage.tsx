import { BookOpen, PencilLine } from 'lucide-react'
import { useCallback } from 'react'
import { Choice } from '../components/Choice'
import { Drill } from '../components/Drill'
import { Screen } from '../components/Screen'
import { makeCube, makeSquare } from '../lib/questions'
import type { Topic } from '../lib/stats'
import { useSaved } from '../lib/useSaved'
import { coloredSheetRowClass } from '../lib/coloredSheet'

type Kind = 'square' | 'cube'
type RangeValue = '1-10' | '11-20' | '1-20' | '21-30' | '1-30' | '1-50'

const RANGES: { value: RangeValue; label: string; min: number; max: number }[] = [
  { value: '1-10', label: '1–10', min: 1, max: 10 },
  { value: '11-20', label: '11–20', min: 11, max: 20 },
  { value: '1-20', label: '1–20', min: 1, max: 20 },
  { value: '21-30', label: '21–30', min: 21, max: 30 },
  { value: '1-30', label: '1–30', min: 1, max: 30 },
  { value: '1-50', label: '1–50', min: 1, max: 50 },
]

function isMode(value: unknown): value is 'read' | 'quiz' {
  return value === 'read' || value === 'quiz'
}

function isRange(value: unknown): value is RangeValue {
  return RANGES.some((range) => range.value === value)
}

function PowersBody({ kind }: { kind: Kind }) {
  const square = kind === 'square'
  const mark = square ? '²' : '³'
  const title = square ? 'Squares' : 'Cubes'
  const topic: Topic = square ? 'squares' : 'cubes'
  const [mode, setMode] = useSaved(square ? 'ssc-sq-mode' : 'ssc-cu-mode', 'read' as 'read' | 'quiz', isMode)
  const [rangeValue, setRangeValue] = useSaved<RangeValue>(
    square ? 'ssc-sq-range' : 'ssc-cu-range',
    square ? '1-30' : '1-20',
    isRange,
  )

  const allowed = square ? RANGES : RANGES.filter((range) => range.value !== '1-50')
  const range = allowed.find((item) => item.value === rangeValue) ?? allowed.find((item) => item.value === '1-30') ?? allowed[0]
  const makeQuestion = useCallback(
    () => (square ? makeSquare(range.min, range.max) : makeCube(range.min, range.max)),
    [range.max, range.min, square],
  )

  const controls = (
    <>
      <Choice
        label="Mode"
        value={mode}
        options={[
          { value: 'read' as const, label: 'Read', icon: <BookOpen size={18} strokeWidth={2.25} aria-hidden /> },
          { value: 'quiz' as const, label: 'Practice', icon: <PencilLine size={18} strokeWidth={2.25} aria-hidden /> },
        ]}
        onChange={setMode}
      />
      <Choice
        label="Numbers"
        value={range.value}
        options={allowed.map((item) => ({ value: item.value, label: item.label }))}
        onChange={setRangeValue}
      />
    </>
  )

  if (mode === 'quiz') {
    return (
      <Drill
        title={title}
        topic={topic}
        revision={`${kind}-${range.value}`}
        makeQuestion={makeQuestion}
        note={`What is the ${square ? 'square' : 'cube'}? Numbers from ${range.min} to ${range.max}.`}
        toolbar={controls}
      />
    )
  }

  const numbers = Array.from({ length: range.max - range.min + 1 }, (_, index) => range.min + index)

  return (
    <Screen title={title} topic={topic}>
      {controls}
      <p className="note">
        {square ? 'Squares' : 'Cubes'} from {range.min} to {range.max}. Switch to Practice when you want to recall them.
      </p>
      <div className="sheet sheet-colored">
        {numbers.map((n, index) => (
          <div className={coloredSheetRowClass(index)} key={n}>
            <span>
              {n}
              {mark}
            </span>
            <span>{square ? n * n : n * n * n}</span>
          </div>
        ))}
      </div>
    </Screen>
  )
}

export default function SquaresPage() {
  return <PowersBody kind="square" />
}

export function CubesPage() {
  return <PowersBody kind="cube" />
}
