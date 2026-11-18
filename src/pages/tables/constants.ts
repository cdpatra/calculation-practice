export const TABLE_MAX = 30
export const TABLE_NUMBERS = Array.from({ length: TABLE_MAX }, (_, index) => index + 1)

export const TABLE_SECTIONS = [
  { title: '1 – 10', from: 1, to: 10 },
  { title: '11 – 20', from: 11, to: 20 },
  { title: '21 – 30', from: 21, to: 30 },
] as const

export const TABLE_TIMES = [10, 20, 30] as const
export { ROW_TONES, coloredSheetRowClass } from '../../lib/coloredSheet'

export function parseTableParam(raw: string | undefined): number | 'mix' | null {
  if (raw === 'mix') return 'mix'
  if (!raw) return null
  const value = Number(raw)
  if (!Number.isInteger(value) || value < 1 || value > TABLE_MAX) return null
  return value
}