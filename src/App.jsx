import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Telemetria from './pages/Telemetria'
import CadastroMissoes from './pages/CadastroMissoes'
import './styles/App.css'
import { collection, getDocs, addDoc, doc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

//hardcodando as missoes para teste
const missaoInicial = [
  { id: 101, origem: "Farmacia", destino: "Enfermaria A", tipoCarga: "medicamento", prioridade: 2, distancia: 60, status: "pendente" },
  { id: 102, origem: "Posto de Enfermagem", destino: "Laboratorio", tipoCarga: "amostra", prioridade: 3, distancia: 120, status: "pendente" },
  { id: 103, origem: "Almoxarifado", destino: "Centro Cirurgico", tipoCarga: "material", prioridade: 1, distancia: 20, status: "em_execucao" },
  { id: 104, origem: "Farmacia", destino: "UTI", tipoCarga: "medicamento", prioridade: 3, distancia: 90, status: "pendente" },
]

function App() {

  const [missoes, setMissao] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function carregarMissoes(){
      const coletando_missoes = await getDocs(collection(db, "missoes"))

      if(coletando_missoes.empty){
        
        for(const missao of missaoInicial){
          await setDoc(doc(db, "missoes", String(missao.id)), missao)
        }
        setMissao(missaoInicial)
      } else {
        const dados = coletando_missoes.docs.map(doc => ({ docId: doc.id, ...doc.data() }))
        setMissao(dados)
      }
      setCarregando(false)
    }
    carregarMissoes()
  }, [])

  if (carregando) return <div style={{ padding: '2rem', fontFamily: 'Courier New' }}>Carregando dados do banco...</div>

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