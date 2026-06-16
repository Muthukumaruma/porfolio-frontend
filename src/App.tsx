import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import HomePage from './pages/HomePage'
import MouseGlow from './components/ui/MouseGlow'
import GalaxyBackground from './components/ui/GalaxyBackground'
import BigBangIntro from './components/ui/BigBangIntro'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroDone = () => {
    setShowIntro(false)
  }

  return (
    <ThemeProvider>
      {showIntro && <BigBangIntro onDone={handleIntroDone} />}
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
