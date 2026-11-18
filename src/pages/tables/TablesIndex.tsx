import { useNavigate } from 'react-router-dom'
import { Screen } from '../../components/Screen'
import { TABLE_NUMBERS, TABLE_SECTIONS } from './constants'

export default function TablesIndex() {
  const navigate = useNavigate()

  const open = (value: number) => {
    navigate(`/tables/${value}`)
  }

  return (
    <Screen title="Tables" topic="tables">
      <p className="note">Tap a number to open that table. Switch between read and practice on the next screen.</p>

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

      <button type="button" className="menu-btn table-mix" onClick={() => navigate('/tables/mix')}>
        <strong>Mix</strong>
        <span className="desc">Random table in a range you pick, on every question</span>
      </button>
    </Screen>
  )
}