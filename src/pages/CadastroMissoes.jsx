import { useState } from 'react'
import '../styles/Missoes.css'


//hardcodando missoes para teste
const missaoInicial = [
  { id: 101, origem: "Farmacia", destino: "Enfermaria A", tipoCarga: "medicamento", prioridade: 2, distancia: 60, status: "pendente" },
  { id: 102, origem: "Posto de Enfermagem", destino: "Laboratorio", tipoCarga: "amostra", prioridade: 3, distancia: 120, status: "pendente" },
  { id: 103, origem: "Almoxarifado", destino: "Centro Cirurgico", tipoCarga: "material", prioridade: 1, distancia: 20, status: "em_execucao" },
  { id: 104, origem: "Farmacia", destino: "UTI", tipoCarga: "medicamento", prioridade: 3, distancia: 90, status: "pendente" },
]

const transicoes = {
  pendente: ["em_execucao", "cancelada"],
  em_execucao: ["concluida", "falha"],
  falha: ["pendente"],
  concluida: [],
  cancelada: [],
}

function CadastroMissoes() {

    const [missoes, setMissao] = useState(missaoInicial)

    const [formulario, setFormulario] = useState({
        origem: '',
        destino: '',
        tipoCarga: '',
        prioridade: '',
        distancia: ''
    })
    
    const [erros, setErros] = useState ({})

    // ordenando a fila de missoes
    const filaOrdenada = [...missoes]
        .filter(m => m.status === "pendente")
        .sort((missao_a, missao_b) => missao_b.prioridade - missao_a.prioridade || missao_a.distancia - missao_b.distancia)
    
    // coleta as que nao estão pendentes
    const outrasMissoes = missoes.filter(prev_m => prev_m.status !== "pendente")


    // validacao do formulario
    function validar(){
        const mensagem = {}

        if(!formulario.origem.trim()) mensagem.origem = "Origem Obrigatória"
        if(!formulario.destino.trim()) mensagem.destino = "Destino Obrigatório"
        if(!formulario.tipoCarga.trim()) mensagem.tipoCarga = "Tipo de carga obrigatório"

        if(!formulario.prioridade) mensagem.prioridade = "Selecione uma prioridade"

        const dist = Number(formulario.distancia)
        if(!dist || dist <= 0) mensagem.distancia = "Distancia deve ser maior que zero"

        return mensagem
    }


    // cadastrando a missao
    function cadastrar(){

        //coletando mensagens de erro na validacao
        const mensagem = validar() 
        if(Object.keys(mensagem).length > 0) { setErros(mensagem) ; return}


        const novoId = Math.max(...missoes.map(m => m.id)) + 1
        const nova = {
            id: novoId,
            origem: formulario.origem,
            destino: formulario.destino,
            tipoCarga: formulario.tipoCarga,
            prioridade: Number(formulario.prioridade),
            distancia: Number(formulario.distancia),
            status: "pendente"
        }

        setMissao(prev_missoes => [...prev_missoes, nova])
        setFormulario({
            origem: '', 
            destino: '', 
            tipoCarga: '',
            prioridade: '',
            distancia: ''
        })
        setErros({})
    }


    function mudarStatus(id, novoStatus){
        setMissao(prev_missoes => prev_missoes.map(m => m.id === id ? {...m, status: novoStatus} : m))
    }

  return (

    <div className="missoes-container">
      <section className="form-section">
        <h2 className="section-titulo">Nova Missão</h2>
        <div className="form-grid">
          {['origem', 'destino', 'tipoCarga', 'distancia'].map(campo => (
            <div className="form-grupo" key={campo}>
              <label className="form-label">{campo}</label>
              <input
                className={`form-input ${erros[campo] ? 'input-erro' : ''}`}
                value={formulario[campo]}
                onChange={e => setFormulario(prev => ({ ...prev, [campo]: e.target.value }))}
              />
              {erros[campo] && <span className="erro-msg">{erros[campo]}</span>}
            </div>
          ))}
          <div className="form-grupo">
            <label className="form-label">Prioridade</label>
            <div className="prio-botoes">
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  className={`btn-prio ${formulario.prioridade === n ? 'btn-prio-ativo' : ''}`}
                  onClick={() => setFormulario(prev => ({ ...prev, prioridade: n }))}
                >
                  {n}
                </button>
              ))}
            </div>
            {erros.prioridade && <span className="erro-msg">{erros.prioridade}</span>}
          </div>
        </div>
        <button className="btn-cadastrar" onClick={cadastrar}>Cadastrar Missão</button>
      </section>

      <section className="lista-section">
        <h2 className="section-titulo">Fila de Missões</h2>
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {[...filaOrdenada, ...outrasMissoes].map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.origem}</td>
                <td>{m.destino}</td>
                <td>{m.tipoCarga}</td>
                <td>{m.prioridade}</td>
                <td>{m.distancia}m</td>
                <td><span className={`badge badge-${m.status}`}>{m.status}</span></td>
                <td className="acoes">
                  {transicoes[m.status].map(proximo => (
                    <button
                      key={proximo}
                      className={`btn-status btn-${proximo}`}
                      onClick={() => mudarStatus(m.id, proximo)}
                    >
                      {proximo.replace('_', ' ')}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default CadastroMissoes