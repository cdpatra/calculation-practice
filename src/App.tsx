import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdditionPage from './pages/AdditionPage'
import SubtractionPage from './pages/SubtractionPage'
import MultiplicationPage from './pages/MultiplicationPage'
import DivisionPage from './pages/DivisionPage'
import TablesPage from './pages/TablesPage'
import SquaresPage, { CubesPage } from './pages/PowersPage'

function Missing() {
  return (
    <div className="screen">
      <h1 className="home-title">Page not found</h1>
      <Link to="/" className="menu-btn">
        <strong>Back to practice</strong>
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addition" element={<AdditionPage />} />
        <Route path="/subtraction" element={<SubtractionPage />} />
        <Route path="/multiplication" element={<MultiplicationPage />} />
        <Route path="/division" element={<DivisionPage />} />
        <Route path="/tables/*" element={<TablesPage />} />
        <Route path="/squares" element={<SquaresPage />} />
        <Route path="/cubes" element={<CubesPage />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  )
}
