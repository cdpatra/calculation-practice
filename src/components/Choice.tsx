import type { ReactNode } from 'react'

type Option<T extends string | number> = { value: T; label: string; icon?: ReactNode }

export function Choice<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly Option<T>[]
  onChange: (value: T) => void
}) {
  return (
    <div className="choice">
      <div className="choice-label">{label}</div>
      <div className="chips" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={String(option.value)}
            type="button"
            className={option.icon ? (option.value === value ? 'chip chip-icon on' : 'chip chip-icon') : option.value === value ? 'chip on' : 'chip'}
            aria-pressed={option.value === value}
            aria-label={option.icon ? option.label : undefined}
            onClick={() => onChange(option.value)}
          >
            {option.icon ?? option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
