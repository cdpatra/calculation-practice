import { useNavigate } from 'react-router-dom'
import { Choice } from '../../components/Choice'
import { Screen } from '../../components/Screen'
import { useSaved } from '../../lib/useSaved'
import { TABLE_NUMBERS, TABLE_SECTIONS } from './constants'

function isMode(value: unknown): value is 'read' | 'quiz' {
  return value === 'read' || value === 'quiz'
}

export default function TablesIndex() {
  const navigate = useNavigate()
  const [mode, setMode] = useSaved('ssc-table-mode', 'read' as 'read' | 'quiz', isMode)

  const open = (value: number) => {
    navigate(mode === 'read' ? `/tables/read/${value}` : `/tables/practice/${value}`)
  }

  return (
    <Screen title="Tables" topic="tables">
      <Choice
        label="Mode"
        value={mode}
        options={[
          { value: 'read' as const, label: 'Read' },
          { value: 'quiz' as const, label: 'Practice' },
        ]}
        onChange={setMode}
      />
      <p className="note">
        {mode === 'read'
          ? 'Tap a number to read that multiplication table.'
          : 'Tap a number to practice that table, or choose Mix below.'}
      </p>

      {TABLE_SECTIONS.map((section) => (
        <section className="table-section" key={section.title}>
          <h2 className="table-section-title">{section.title}</h2>
          <div className="table-grid">
            {TABLE_NUMBERS.filter((value) => value >= section.from && value <= section.to).map((value) => (
              <button key={value} type="button" className="table-grid-btn" onClick={() => open(value)}>
                {value}
              </button>
            ))}
          </div>
        </section>
      ))}

      {mode === 'quiz' ? (
        <button type="button" className="menu-btn table-mix" onClick={() => navigate('/tables/practice/mix')}>
          <strong>Mix</strong>
          <span className="desc">Random table from 1 to 30 on every question</span>
        </button>
      ) : null}
    </Screen>
  )
}