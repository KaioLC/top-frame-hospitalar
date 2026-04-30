import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Telemetria from './pages/Telemetria'
import CadastroMissoes from './pages/CadastroMissoes'
import './styles/App.css'

//hardcodando as missoes para teste
const missaoInicial = [
  { id: 101, origem: "Farmacia", destino: "Enfermaria A", tipoCarga: "medicamento", prioridade: 2, distancia: 60, status: "pendente" },
  { id: 102, origem: "Posto de Enfermagem", destino: "Laboratorio", tipoCarga: "amostra", prioridade: 3, distancia: 120, status: "pendente" },
  { id: 103, origem: "Almoxarifado", destino: "Centro Cirurgico", tipoCarga: "material", prioridade: 1, distancia: 20, status: "em_execucao" },
  { id: 104, origem: "Farmacia", destino: "UTI", tipoCarga: "medicamento", prioridade: 3, distancia: 90, status: "pendente" },
]

function App() {

  const [missoes, setMissao] = useState(missaoInicial)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Telemetria missoes={missoes} />} />
        <Route path="/missoes" element={<CadastroMissoes missoes={missoes} setMissoes={setMissao}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App