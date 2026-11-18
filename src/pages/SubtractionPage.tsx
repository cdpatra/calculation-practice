import { useCallback } from 'react'
import { Choice } from '../components/Choice'
import { Drill } from '../components/Drill'
import { makeSubtraction } from '../lib/questions'
import { useSaved } from '../lib/useSaved'

const DIGITS = [2, 3, 4] as const

function isDigit(value: unknown): value is (typeof DIGITS)[number] {
  return typeof value === 'number' && (DIGITS as readonly number[]).includes(value)
}

export default function SubtractionPage() {
  const [digits, setDigits] = useSaved('ssc-sub-digits', 2, isDigit)
  const makeQuestion = useCallback(() => makeSubtraction(digits), [digits])

  return (
    <Drill
      title="Subtraction"
      topic="subtraction"
      revision={String(digits)}
      makeQuestion={makeQuestion}
      note={`Subtract two ${digits}-digit numbers. The answer is always positive.`}
      toolbar={
        <Choice
          label="Digits"
          value={digits}
          options={DIGITS.map((value) => ({ value, label: `${value}-digit` }))}
          onChange={setDigits}
        />
      }
    />
  )
}
