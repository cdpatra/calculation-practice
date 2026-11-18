import { useCallback, useState } from 'react'
import { Choice } from '../components/Choice'
import { Drill } from '../components/Drill'
import { Screen } from '../components/Screen'
import { FACTORS, makeDividePractice, makeMultiplyPractice } from '../lib/questions'
import type { Topic } from '../lib/stats'
import { useSaved } from '../lib/useSaved'

type Mode = 'multiply' | 'divide'
type Factor = number | 'any'
type Size = number | 'mix'

const MULTIPLY_SIZES = [
  { value: 2 as Size, label: '2-digit' },
  { value: 3 as Size, label: '3-digit' },
  { value: 4 as Size, label: '4-digit' },
  { value: 5 as Size, label: '5-digit' },
  { value: 'mix' as Size, label: 'Mix' },
]

const DIVIDE_SIZES = [
  { value: 1 as Size, label: '1-digit' },
  { value: 2 as Size, label: '2-digit' },
  { value: 3 as Size, label: '3-digit' },
  { value: 'mix' as Size, label: 'Mix' },
]

function isMultiplySize(value: unknown): value is Size {
  return value === 'mix' || value === 2 || value === 3 || value === 4 || value === 5
}

function isDivideSize(value: unknown): value is Size {
  return value === 'mix' || value === 1 || value === 2 || value === 3
}

export function FactorPractice({ mode }: { mode: Mode }) {
  const multiply = mode === 'multiply'
  const [factor, setFactor] = useState<Factor | null>(null)
  const [size, setSize] = useSaved<Size>(
    multiply ? 'ssc-mul-size' : 'ssc-div-size',
    multiply ? 'mix' : 2,
    multiply ? isMultiplySize : isDivideSize,
  )

  const makeQuestion = useCallback(() => {
    if (factor === null) return makeMultiplyPractice(2, 2)
    return multiply ? makeMultiplyPractice(factor, size) : makeDividePractice(factor, size)
  }, [factor, multiply, size])

  if (factor === null) {
    return (
      <Screen title={multiply ? 'Multiplication' : 'Division'} topic={multiply ? 'multiplication' : 'division'}>
        <p className="note">
          {multiply
            ? 'Pick a number. Every question uses that number, like 23 × 12, 322 × 12 and 12312 × 12.'
            : 'Pick a divisor. Every question divides exactly by that number, like 276 ÷ 12 or 14784 ÷ 12.'}
        </p>
        <button type="button" className="menu-btn" onClick={() => setFactor('any')}>
          <strong>Any number</strong>
          <span>A different number on every question</span>
        </button>
        <p className="choice-label">Lock one number</p>
        <div className="factor-grid">
          {FACTORS.map((value) => (
            <button key={value} type="button" onClick={() => setFactor(value)}>
              {value}
            </button>
          ))}
        </div>
      </Screen>
    )
  }

  const title = multiply
    ? factor === 'any'
      ? 'Multiplication'
      : `Multiply by ${factor}`
    : factor === 'any'
      ? 'Division'
      : `Divide by ${factor}`

  const note = multiply
    ? factor === 'any'
      ? 'The second number changes every question.'
      : `Every question is multiplied by ${factor}.`
    : factor === 'any'
      ? 'The divisor changes every question. The answer is a whole number.'
      : `Every question divides exactly by ${factor}.`

  const topic: Topic = multiply ? 'multiplication' : 'division'

  return (
    <Drill
      title={title}
      topic={topic}
      revision={`${factor}-${size}`}
      makeQuestion={makeQuestion}
      note={note}
      toolbar={
        <Choice
          label={multiply ? 'Digits in the other number' : 'Digits in the answer'}
          value={size}
          options={multiply ? MULTIPLY_SIZES : DIVIDE_SIZES}
          onChange={setSize}
        />
      }
    />
  )
}
