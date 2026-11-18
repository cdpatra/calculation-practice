import { Navigate, useParams } from 'react-router-dom'
import { parseTableParam } from './constants'

/** Legacy `/tables/pick/:table` URLs forward to the single table screen. */
export default function TablePick() {
  const { table: raw } = useParams()
  const table = parseTableParam(raw)
  if (table === null) return <Navigate to="/tables" replace />
  return <Navigate to={`/tables/${table}`} replace />
}