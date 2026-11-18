import { useCallback } from 'react'
import { Choice } from '../components/Choice'
import { Drill } from '../components/Drill'
import { makeAddition } from '../lib/questions'
import { useSaved } from '../lib/useSaved'

const DIGITS = [1, 2, 3, 4] as const
const COUNTS = [2, 3, 4, 5, 6, 8] as const

function isDigit(value: unknown): value is (typeof DIGITS)[number] {
  return typeof value === 'number' && (DIGITS as readonly number[]).includes(value)
}

function isCount(value: unknown): value is (typeof COUNTS)[number] {
  return typeof value === 'number' && (COUNTS as readonly number[]).includes(value)
}

export default function AdditionPage() {
  const [digits, setDigits] = useSaved('ssc-add-digits', 2, isDigit)
  const [count, setCount] = useSaved('ssc-add-count', 2, isCount)

  const makeQuestion = useCallback(() => makeAddition(digits, count), [digits, count])

  return (
    <Drill
      title="Addition"
      topic="addition"
      revision={`${digits}-${count}`}
      makeQuestion={makeQuestion}
      note={
        count > 2 && digits === 2
          ? `Add ${count} numbers of 2 digits, like 12 + 23 + 32 + 42 + 13.`
          : `Add ${count} numbers, each with ${digits} digits. Questions keep coming.`
      }
      toolbar={
        <>
          <Choice
            label="Digits in each number"
            value={digits}
            options={DIGITS.map((value) => ({ value, label: String(value) }))}
            onChange={setDigits}
          />
          <Choice
            label="How many numbers"
            value={count}
            options={COUNTS.map((value) => ({ value, label: String(value) }))}
            onChange={setCount}
          />
        </>
      }
    />
  )
}
