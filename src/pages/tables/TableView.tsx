import { useCallback } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Choice } from '../../components/Choice'
import { Drill } from '../../components/Drill'
import { Screen } from '../../components/Screen'
import { makeTableQuestion } from '../../lib/questions'
import { useSaved } from '../../lib/useSaved'
import { coloredSheetRowClass } from '../../lib/coloredSheet'
import { TABLE_MAX, TABLE_TIMES, parseTableParam } from './constants'
import { TableModeChoice } from './TableModeChoice'
import { useMixTableRange } from './tableMixRange'

function isMode(value: unknown): value is 'read' | 'quiz' {
  return value === 'read' || value === 'quiz'
}

function isTimes(value: unknown): value is (typeof TABLE_TIMES)[number] {
  return value === 10 || value === 20 || value === 30
}

export default function TableView() {
  const { table: raw } = useParams()
  const picked = parseTableParam(raw)
  const [mode, setMode] = useSaved('ssc-table-mode', 'read' as 'read' | 'quiz', isMode)
  const [times, setTimes] = useSaved('ssc-table-times', 10, isTimes)
  const mixTableRange = useMixTableRange()

  const which = picked === 'mix' ? 'mix' : picked ?? 2
  const makeQuestion = useCallback(
    () =>
      picked === 'mix'
        ? makeTableQuestion('mix', times, mixTableRange.min, mixTableRange.max)
        : makeTableQuestion(which, times),
    [which, times, picked, mixTableRange.min, mixTableRange.max],
  )

  if (picked === null) {
    return <Navigate to="/tables" replace />
  }

  const isMix = picked === 'mix'
  const title = isMix ? 'Tables' : `Table of ${picked}`

  const timesChoice = (
    <Choice
      label="Up to"
      value={times}
      options={TABLE_TIMES.map((value) => ({ value, label: `× ${value}` }))}
      onChange={setTimes}
    />
  )

  if (!isMix && mode === 'read') {
    const multipliers = Array.from({ length: TABLE_MAX }, (_, index) => index + 1)

    return (
      <Screen title={title} topic="tables">
        <TableModeChoice mode={mode} onModeChange={setMode} />
        <p className="note">Memorize this table from ×1 to ×{TABLE_MAX}.</p>
        <div className="sheet sheet-colored">
          {multipliers.map((timesValue) => (
            <div className={coloredSheetRowClass(timesValue - 1)} key={timesValue}>
              <span>
                {picked} × {timesValue}
              </span>
              <span>{picked * timesValue}</span>
            </div>
          ))}
        </div>
      </Screen>
    )
  }

  const note = isMix
    ? `Random table from ${mixTableRange.min} to ${mixTableRange.max}, up to × ${times}.`
    : `Only ${picked} × 1 to ${picked} × ${times}.`

  return (
    <Drill
      title={title}
      topic="tables"
      revision={isMix ? `${mixTableRange.revision}-${times}` : `${which}-${times}`}
      makeQuestion={makeQuestion}
      note={note}
      toolbar={
        <>
          {!isMix ? <TableModeChoice mode={mode} onModeChange={setMode} /> : null}
          {isMix ? mixTableRange.controls : null}
          {timesChoice}
        </>
      }
    />
  )
}