import { useState } from 'react'
import '../styles/Missoes.css'

function Registros({ missoes }) {
  const [jsonVisivel, setJsonVisivel] = useState(false)

  const historico = missoes
    .filter(m => ["concluida", "cancelada", "falha"].includes(m.status))
    .sort((a, b) => b.id - a.id)

  function simularEnvio() {
    setJsonVisivel(prev => !prev)
        console.log("Enviando dados para API hospitalar", {
        timestamp: new Date().toISOString(),
        total_missoes: historico.length,
        missoes: historico.map(m => ({
        missao_id: m.id,
        status: m.status,
        origem: m.origem,
        destino: m.destino,
        tipo_carga: m.tipoCarga,
        prioridade: m.prioridade,
        distancia: m.distancia,
        }))
    })
  }

  return (

    <div className="missoes-container">

        <section className="lista-section">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 className="section-titulo" style={{ margin: 0 }}>Histórico de Missões</h2>
            <button className="btn-cadastrar" onClick={simularEnvio} disabled={historico.length === 0}>
            {jsonVisivel ? 'Fechar' : 'Enviar tudo para API'}
            </button>
        </div>

        {jsonVisivel && (
            <pre style={{ fontFamily: 'Courier New', fontSize: '12px', color: '#1a2636', background: '#f4f6f9', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem', overflowX: 'auto' }}>
            {JSON.stringify({
                timestamp: new Date().toISOString(),
                total_missoes: historico.length,
                missoes: historico.map(m => ({
                missao_id: m.id,
                status: m.status,
                origem: m.origem,
                destino: m.destino,
                tipo_carga: m.tipoCarga,
                prioridade: m.prioridade,
                distancia: m.distancia,
                }))
            }, null, 2)}
            </pre>
        )}

        {historico.length === 0 ? (
            <p style={{ fontSize: '13px', color: '#8a96a8' }}>Nenhuma missão finalizada ainda.</p>
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
                </tr>
            </thead>
            <tbody>
                {historico.map(m => (
                <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.origem}</td>
                    <td>{m.destino}</td>
                    <td>{m.tipoCarga}</td>
                    <td>{m.prioridade}</td>
                    <td>{m.distancia}m</td>
                    <td><span className={`badge badge-${m.status}`}>{m.status}</span></td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </section>
    </div>
  )
}

export default Registros