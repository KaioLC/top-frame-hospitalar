import { useState, useEffect } from 'react'
import "../styles/Telemetria.css"
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase'

function Telemetria({missoes}) {

  // atributos da telemetria
  const [telemetria, setTelemetria] = useState({
    bateria: 100,
    latencia: 15,
    statusRobo: "Disponivel",
  });

  const missaoAtual = missoes.find(m => m.status === "em_execucao") || null

  // gerar alertas
  const alertaBateria = telemetria.bateria < 20;
  const alertaLatencia = telemetria.latencia > 100;
  const alertaStatusMissao = missoes.some(m => m.status === "falha");


  useEffect(() => {
    async function carregarTelemetria() {
        const docRef = doc(db, "telemetria", "robo")
        const snapshot = await getDoc(docRef)
        if (snapshot.exists()) {
        setTelemetria(snapshot.data())
        }
    }
    carregarTelemetria()
  }, [])

  useEffect(() => {
      
    // criando alternancia de latencia e descarregamento da bateria para gerar alertas
    const interval = setInterval(() => {
      setTelemetria(prev => {
        const atualizada_telemetria = {
        ...prev, // copiando campos da telemetria antes de sobrescrever
        bateria: prev.bateria > 0 ? prev.bateria - 1 : 0,
        latencia: Math.floor(Math.random() * 140) + 10,
        ultimaAtualizacao: new Date().toLocaleTimeString('pt-BR')
        }
        setDoc(doc(db, "telemetria", "robo"), atualizada_telemetria)
        return atualizada_telemetria
    });

    }, 6000); // ocorre a cada 3segundos 

    return () => clearInterval(interval);
  }, []);

  return (

    <div className="telemetria-container">     
      <header className="telemetria-header">
        {/* cabeçalho da página */}
        <h1>Painel de Telemetria</h1>

        <div className={`tem-bateria ${telemetria.bateria === 0 ? 'offline' : 'online'}`}>
          {telemetria.bateria === 0 ? "SISTEMA OFFLINE" : "SISTEMA ONLINE"}
        </div>

      </header>

      {/* Infos de telemetria */}
      <div className="telemetria-grid">

        {/* Sobre a bateria */}
        <div className={`card-telemetria ${alertaBateria ? 'bateria-critica' : ''}`}> 
          <div className="card-titulo">Nível de Bateria</div>
          <div className="card-valor">{telemetria.bateria}%</div>
          <div className="bateria-barra-container">
            <div className="bateria-barra-preencher" style={{ width: `${telemetria.bateria}%`}}>
            </div>
          </div>
        </div>

        {/* Sobre a latencia */}
        <div className={`card-telemetria ${alertaLatencia ? 'latencia-alta': ''}`}>
          <div className="card-titulo">Latência</div>
          <div className="card-valor">{telemetria.latencia}ms</div>
        </div>

        {/* Sobre a missão atual */}
        <div className="card-telemetria">
          <div className="card-titulo">Missão em Curso</div>
          <div className="card-valor" style={{fontSize: '1.2rem'}}>
            {missaoAtual ? missaoAtual.id : "Nenhuma missão ativa"}
          </div>
          {missaoAtual && <div className="status-missao">Distância: {missaoAtual.distancia}m</div>}
          {missaoAtual && <div className="status-missao">Status: {missaoAtual.status}</div>}
          <div className="status-missao">Última atualização: {telemetria.ultimaAtualizacao || "--:--:--"}</div>
        </div>

      </div>

      {/* Painel de alertas */}
      <section className="active-alerts">
        <h3>Alertas do Sistema</h3>
        <div className="alertas">

          {!alertaBateria && !alertaLatencia && <p className="sem-alertas"> Nenhum alerta detectado</p>}

          {alertaBateria && (
            <div className="tem-alerta">
              <strong> Bateria está descarregando</strong>
            </div>
          )}

          {alertaLatencia && (
            <div className="tem-alerta">
              <strong>Alta latência de rede</strong>
            </div>
          )}

          {telemetria.bateria === 0 && (
            <button className="button-emergencia" onClick={() => 
              setTelemetria(prev => ({
                ...prev,
                bateria: 100,
                statusRobo: "Disponivel"
              }))
            }>
              REINICIALIZAR
            </button>
          )}

          {alertaStatusMissao && (
            <div className="tem-alerta">
                <strong>Missão com falha detectada</strong>
            </div>
          )}
        </div>
      </section>


    </div>


    
  )
}

export default Telemetria

