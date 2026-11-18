import { Route, Routes } from 'react-router-dom'
import { TableLegacyPracticeRedirect, TableLegacyReadRedirect } from './tables/TableLegacyRedirect'
import TablePick from './tables/TablePick'
import TablesIndex from './tables/TablesIndex'
import TableView from './tables/TableView'

export default function TablesPage() {
  return (
    <Routes>
      <Route index element={<TablesIndex />} />
      <Route path="pick/:table" element={<TablePick />} />
      <Route path="read/:table" element={<TableLegacyReadRedirect />} />
      <Route path="practice/:table" element={<TableLegacyPracticeRedirect />} />
      <Route path=":table" element={<TableView />} />
    </Routes>
  )
}