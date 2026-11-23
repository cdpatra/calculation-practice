import { PYTHAGOREAN_TRIPLETS } from './pythagoreanTriples'

export type Operator = '+' | '−' | '×' | '÷'

export type Question = {
  id: number
  layout: 'column' | 'expression'
  operator: Operator
  operands: number[]
  expression?: string
  answer: number
}

export const FACTORS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25] as const

let nextId = 1

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function withDigits(digits: number): number {
  if (digits <= 1) return randomInt(1, 9)
  const min = 10 ** (digits - 1)
  const max = 10 ** digits - 1
  return randomInt(min, max)
}

function pickFactor(): number {
  return FACTORS[randomInt(0, FACTORS.length - 1)]
}

export function makeAddition(digits: number, count: number): Question {
  const operands = Array.from({ length: count }, () => withDigits(digits))
  return {
    id: nextId++,
    layout: 'column',
    operator: '+',
    operands,
    answer: operands.reduce((sum, value) => sum + value, 0),
  }
}

export function makeSubtraction(digits: number): Question {
  let a = withDigits(digits)
  let b = withDigits(digits)
  if (a < b) [a, b] = [b, a]
  if (a === b) {
    if (a < 10 ** digits - 1) a += 1
    else b = Math.max(1, b - 1)
  }
  return {
    id: nextId++,
    layout: 'column',
    operator: '−',
    operands: [a, b],
    answer: a - b,
  }
}

export function makeMultiplyPractice(factor: number | 'any', digits: number | 'mix'): Question {
  const chosen = factor === 'any' ? pickFactor() : factor
  const size = digits === 'mix' ? randomInt(2, 5) : digits
  const multiplicand = withDigits(size)
  return {
    id: nextId++,
    layout: 'column',
    operator: '×',
    operands: [multiplicand, chosen],
    answer: multiplicand * chosen,
  }
}

export function makeDividePractice(divisor: number | 'any', answerDigits: number | 'mix'): Question {
  const chosen = divisor === 'any' ? pickFactor() : divisor
  const size = answerDigits === 'mix' ? randomInt(1, 3) : answerDigits
  const quotient = withDigits(size)
  const dividend = quotient * chosen
  return {
    id: nextId++,
    layout: 'expression',
    operator: '÷',
    operands: [dividend, chosen],
    expression: `${dividend} ÷ ${chosen}`,
    answer: quotient,
  }
}

export function makeTableQuestion(
  table: number | 'mix',
  maxTimes: number,
  mixTableMin = 1,
  mixTableMax = 30,
): Question {
  const a = table === 'mix' ? randomInt(mixTableMin, mixTableMax) : table
  const b = randomInt(1, maxTimes)
  return {
    id: nextId++,
    layout: 'expression',
    operator: '×',
    operands: [a, b],
    expression: `${a} × ${b}`,
    answer: a * b,
  }
}

export function makeSquare(min: number, max: number): Question {
  const n = randomInt(min, max)
  return {
    id: nextId++,
    layout: 'expression',
    operator: '×',
    operands: [n],
    expression: `${n}²`,
    answer: n * n,
  }
}

export function makeCube(min: number, max: number): Question {
  const n = randomInt(min, max)
  return {
    id: nextId++,
    layout: 'expression',
    operator: '×',
    operands: [n],
    expression: `${n}³`,
    answer: n * n * n,
  }
}

export function makePythagoreanTripleQuestion(): Question {
  const triple = PYTHAGOREAN_TRIPLETS[randomInt(0, PYTHAGOREAN_TRIPLETS.length - 1)]
  const hide = randomInt(0, 2)
  const shown = triple.map((value, index) => (index === hide ? '?' : String(value)))
  return {
    id: nextId++,
    layout: 'expression',
    operator: '+',
    operands: [...triple, hide],
    expression: shown.join(' , '),
    answer: triple[hide],
  }
}
