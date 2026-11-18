export const TABLE_MAX = 30
export const TABLE_NUMBERS = Array.from({ length: TABLE_MAX }, (_, index) => index + 1)

export const TABLE_SECTIONS = [
  { title: '1 – 10', from: 1, to: 10 },
  { title: '11 – 20', from: 11, to: 20 },
  { title: '21 – 30', from: 21, to: 30 },
] as const

export const TABLE_TIMES = [10, 20, 30] as const

export const TABLE_MIX_RANGES = [
  { value: '1-10', label: '1–10', min: 1, max: 10 },
  { value: '11-20', label: '11–20', min: 11, max: 20 },
  { value: '21-30', label: '21–30', min: 21, max: 30 },
  { value: '1-20', label: '1–20', min: 1, max: 20 },
  { value: '1-30', label: '1–30', min: 1, max: 30 },
] as const

export type TableMixRangeValue = (typeof TABLE_MIX_RANGES)[number]['value'] | 'custom'
export { ROW_TONES, coloredSheetRowClass } from '../../lib/coloredSheet'

export function parseTableParam(raw: string | undefined): number | 'mix' | null {
  if (raw === 'mix') return 'mix'
  if (!raw) return null
  const value = Number(raw)
  if (!Number.isInteger(value) || value < 1 || value > TABLE_MAX) return null
  return value
}