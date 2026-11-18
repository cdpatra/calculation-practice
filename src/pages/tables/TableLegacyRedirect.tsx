import { Navigate, useParams } from 'react-router-dom'
import { parseTableParam } from './constants'

export function TableLegacyReadRedirect() {
  const { table: raw } = useParams()
  const table = parseTableParam(raw)
  if (table === null) return <Navigate to="/tables" replace />
  return <Navigate to={`/tables/${table}`} replace />
}

export function TableLegacyPracticeRedirect() {
  const { table: raw } = useParams()
  const table = parseTableParam(raw)
  if (table === null) return <Navigate to="/tables" replace />
  return <Navigate to={`/tables/${table}`} replace />
}