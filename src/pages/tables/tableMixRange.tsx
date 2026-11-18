import { Choice } from '../../components/Choice'
import { useSaved } from '../../lib/useSaved'
import { RangeCustomInput } from './RangeCustomInput'
import { TABLE_MAX, TABLE_MIX_RANGES, type TableMixRangeValue } from './constants'

function isMixRange(value: unknown): value is TableMixRangeValue {
  return value === 'custom' || TABLE_MIX_RANGES.some((range) => range.value === value)
}

function isTableIndex(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= TABLE_MAX
}

export function clampTableIndex(value: number): number {
  return Math.min(TABLE_MAX, Math.max(1, Math.round(value)))
}

export function resolveMixTableRange(
  preset: TableMixRangeValue,
  customMin: number,
  customMax: number,
): { min: number; max: number } {
  if (preset !== 'custom') {
    const found = TABLE_MIX_RANGES.find((range) => range.value === preset) ?? TABLE_MIX_RANGES[TABLE_MIX_RANGES.length - 1]
    return { min: found.min, max: found.max }
  }
  const min = clampTableIndex(customMin)
  const max = clampTableIndex(customMax)
  return { min: Math.min(min, max), max: Math.max(min, max) }
}

export function useMixTableRange() {
  const [mixRangeValue, setMixRangeValue] = useSaved<TableMixRangeValue>('ssc-table-mix-range', '1-30', isMixRange)
  const [customMin, setCustomMin] = useSaved('ssc-table-mix-from', 1, isTableIndex)
  const [customMax, setCustomMax] = useSaved('ssc-table-mix-to', TABLE_MAX, isTableIndex)

  const { min, max } = resolveMixTableRange(mixRangeValue, customMin, customMax)

  const commitFrom = (raw: string) => {
    const next = clampTableIndex(raw === '' ? 1 : Number(raw))
    setCustomMin(next)
    if (next > customMax) setCustomMax(next)
  }

  const commitTo = (raw: string) => {
    const next = clampTableIndex(raw === '' ? TABLE_MAX : Number(raw))
    setCustomMax(next)
    if (next < customMin) setCustomMin(next)
  }

  const controls = (
    <div className="mix-range">
      <Choice
        label="Tables"
        value={mixRangeValue}
        options={[
          ...TABLE_MIX_RANGES.map((range) => ({ value: range.value, label: range.label })),
          { value: 'custom' as const, label: 'Custom' },
        ]}
        onChange={setMixRangeValue}
      />
      {mixRangeValue === 'custom' ? (
        <div className="range-custom">
          <RangeCustomInput label="From" value={customMin} placeholder="1" onCommit={commitFrom} />
          <span className="range-custom-sep" aria-hidden>
            –
          </span>
          <RangeCustomInput label="To" value={customMax} placeholder={String(TABLE_MAX)} onCommit={commitTo} />
        </div>
      ) : null}
    </div>
  )

  const revision = mixRangeValue === 'custom' ? `mix-custom-${min}-${max}` : `mix-${mixRangeValue}`

  return { min, max, controls, revision }
}