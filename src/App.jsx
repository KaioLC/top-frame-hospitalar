import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Telemetria from './pages/Telemetria'
import CadastroMissoes from './pages/CadastroMissoes'
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Telemetria />} />
        <Route path="/missoes" element={<CadastroMissoes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App