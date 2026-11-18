const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'] as const

export function Keypad({
  disabled,
  onDigit,
  onClear,
  onBackspace,
}: {
  disabled?: boolean
  onDigit: (digit: string) => void
  onClear: () => void
  onBackspace: () => void
}) {
  return (
    <div className="keypad">
      {KEYS.map((key) => (
        <button
          key={key}
          type="button"
          className="key"
          disabled={disabled}
          aria-label={key === 'C' ? 'Clear' : key === '⌫' ? 'Backspace' : undefined}
          onClick={() => {
            if (key === 'C') onClear()
            else if (key === '⌫') onBackspace()
            else onDigit(key)
          }}
        >
          {key}
        </button>
      ))}
    </div>
  )
}
