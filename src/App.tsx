import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import MouseGlow from './components/ui/MouseGlow'
import GalaxyBackground from './components/ui/GalaxyBackground'

export default function App() {
  return (
    <ThemeProvider>
      <GalaxyBackground />
      <MouseGlow />
      <div className="relative" style={{ zIndex: 2 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}
