import { useEffect, useId, useRef, useState } from 'react'
import { TABLE_MAX } from './constants'

export function RangeCustomInput({
  label,
  value,
  onCommit,
  placeholder,
}: {
  label: string
  value: number
  onCommit: (raw: string) => void
  placeholder?: string
}) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [draft, setDraft] = useState(() => String(value))
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    if (!editing) setDraft(String(value))
  }, [value, editing])

  return (
    <label className="range-custom-field" htmlFor={inputId}>
      <span className="range-custom-label">{label}</span>
      <input
        id={inputId}
        ref={inputRef}
        className="range-custom-input"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        enterKeyHint="done"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        aria-label={label}
        placeholder={placeholder}
        value={draft}
        onFocus={() => {
          setEditing(true)
          setDraft(String(value))
        }}
        onChange={(event) => setDraft(event.target.value.replace(/\D/g, '').slice(0, 2))}
        onBlur={() => {
          onCommit(draft)
          setEditing(false)
        }}
        onKeyDown={(event) => {
          event.stopPropagation()
          if (event.key === 'Enter') {
            event.preventDefault()
            inputRef.current?.blur()
          }
        }}
      />
    </label>
  )
}