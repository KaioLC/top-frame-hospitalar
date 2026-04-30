import { useState, useEffect } from 'react'

import './App.css'

function App() {

  // atributos da telemetria
  const [telemetria, setTelemetria] = useState({
    bateria: 100,
    latencia: 15,
    statusRobo: "Disponivel",
    statusMissao: null,
    missaoAtual: null
  });

  // gerar alertas
  const alertaBateria = telemetria.bateria < 20;
  const alertaLatencia = telemetria.latencia > 100;
  const alertaStatusMissao = telemetria.statusMissao === "falha";



  useEffect(() => {
      
    // criando alternancia de latencia e descarregamento da bateria para gerar alertas
    const interval = setInterval(() => {
      setTelemetria(prev => ({

        ...prev, // copiando campos da telemetria antes de sobrescrever

        bateria: prev.bateria > 0 ? prev.bateria - 1 : 0,
        latencia: Math.floor(Math.random() * 140) + 10,

    }));

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

      </div>


    </div>


    
  )
}

export default App

