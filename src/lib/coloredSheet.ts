export const ROW_TONES = ['tone-0', 'tone-1', 'tone-2', 'tone-3', 'tone-4'] as const

export function coloredSheetRowClass(index: number): string {
  return `sheet-row ${ROW_TONES[index % ROW_TONES.length]}`
}