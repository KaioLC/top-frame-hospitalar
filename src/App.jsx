import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Telemetria from './pages/Telemetria'
import CadastroMissoes from './pages/CadastroMissoes'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Telemetria />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App