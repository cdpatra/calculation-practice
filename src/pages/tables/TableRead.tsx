import { Navigate, useParams } from 'react-router-dom'
import { Screen } from '../../components/Screen'
import { ROW_TONES, TABLE_MAX, parseTableParam } from './constants'

export default function TableRead() {
  const { table: raw } = useParams()
  const table = parseTableParam(raw)

  if (table === null || table === 'mix') {
    return <Navigate to="/tables" replace />
  }

  const multipliers = Array.from({ length: TABLE_MAX }, (_, index) => index + 1)

  return (
    <Screen title={`Table of ${table}`} topic="tables">
      <p className="note">Memorize this table from ×1 to ×{TABLE_MAX}.</p>
      <div className="sheet sheet-colored">
        {multipliers.map((timesValue) => (
          <div className={`sheet-row ${ROW_TONES[(timesValue - 1) % ROW_TONES.length]}`} key={timesValue}>
            <span>
              {table} × {timesValue}
            </span>
            <span>{table * timesValue}</span>
          </div>
        ))}
      </div>
    </Screen>
  )
}