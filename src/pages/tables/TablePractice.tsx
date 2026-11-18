import { useCallback } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Choice } from '../../components/Choice'
import { Drill } from '../../components/Drill'
import { makeTableQuestion } from '../../lib/questions'
import { useSaved } from '../../lib/useSaved'
import { TABLE_TIMES, parseTableParam } from './constants'

function isTimes(value: unknown): value is (typeof TABLE_TIMES)[number] {
  return value === 10 || value === 20 || value === 30
}

export default function TablePractice() {
  const { table: raw } = useParams()
  const picked = parseTableParam(raw)
  const [times, setTimes] = useSaved('ssc-table-times', 10, isTimes)
  const which = picked === 'mix' ? 'mix' : picked ?? 2
  const makeQuestion = useCallback(() => makeTableQuestion(which, times), [which, times])

  if (picked === null) {
    return <Navigate to="/tables" replace />
  }

  const title = picked === 'mix' ? 'Tables' : `Table of ${picked}`
  const note =
    picked === 'mix'
      ? `Mixed tables (1–30), up to × ${times}.`
      : `Only ${picked} × 1 to ${picked} × ${times}.`

  return (
    <Drill
      title={title}
      topic="tables"
      revision={`${which}-${times}`}
      makeQuestion={makeQuestion}
      note={note}
      toolbar={
        <Choice
          label="Up to"
          value={times}
          options={TABLE_TIMES.map((value) => ({ value, label: `× ${value}` }))}
          onChange={setTimes}
        />
      }
    />
  )
}