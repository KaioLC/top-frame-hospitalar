import { useState } from 'react'
import '../styles/Missoes.css'

function Historico({ missoes }) {
  const [payloadVisivel, setPayloadVisivel] = useState(null)

  const historico = missoes
    .filter(m => ["concluida", "cancelada", "falha"].includes(m.status))
    .sort((a, b) => b.id - a.id)

  function simularEnvio(missao) {
    const payload = {
      missao_id: missao.id,
      status: missao.status,
      origem: missao.origem,
      destino: missao.destino,
      tipo_carga: missao.tipoCarga,
      prioridade: missao.prioridade,
      distancia: missao.distancia,
      timestamp: new Date().toISOString()
    }
    setPayloadVisivel(payloadVisivel?.missao_id === missao.id ? null : payload)
  }

  return (
    <div className="historico-container missoes-container">
      <section className="lista-section">
        <h2 className="section-titulo">Histórico de Missões</h2>
        {historico.length === 0 ? (
          <p className="sem-historico" style={{ fontSize: '13px', color: '#8a96a8' }}>
            Nenhuma missão finalizada ainda.
          </p>
        ) : (
          <table className="missoes-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Carga</th>
                <th>Prioridade</th>
                <th>Distância</th>
                <th>Status</th>
                <th>API</th>
              </tr>
            </thead>
            <tbody>
              {historico.map(m => (
                <>
                  <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.origem}</td>
                    <td>{m.destino}</td>
                    <td>{m.tipoCarga}</td>
                    <td>{m.prioridade}</td>
                    <td>{m.distancia}m</td>
                    <td><span className={`badge badge-${m.status}`}>{m.status}</span></td>
                    <td>
                      <button
                        className="btn-status btn-em_execucao"
                        onClick={() => simularEnvio(m)}
                      >
                        {payloadVisivel?.missao_id === m.id ? 'fechar' : 'enviar para API'}
                      </button>
                    </td>
                  </tr>
                  {payloadVisivel?.missao_id === m.id && (
                    <tr key={`payload-${m.id}`}>
                      <td colSpan="8" style={{ background: '#f4f6f9', padding: '12px 16px' }}>
                        <pre style={{ fontFamily: 'Courier New', fontSize: '12px', color: '#1a2636', margin: 0 }}>
                          {JSON.stringify(payloadVisivel, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}

export default Historico