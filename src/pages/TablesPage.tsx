import { Route, Routes } from 'react-router-dom'
import TablePractice from './tables/TablePractice'
import TableRead from './tables/TableRead'
import TablesIndex from './tables/TablesIndex'

export default function TablesPage() {
  return (
    <Routes>
      <Route index element={<TablesIndex />} />
      <Route path="read/:table" element={<TableRead />} />
      <Route path="practice/:table" element={<TablePractice />} />
    </Routes>
  )
}