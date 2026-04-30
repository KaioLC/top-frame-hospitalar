# Top Frame Hospitalar — Robô Autônomo

Protótipo de sistema para gerenciamento de missões hospitalares de um robô autônomo. Permite cadastrar missões, organizar a fila por prioridade, controlar o status de cada missão e monitorar dados de telemetria simulada em tempo real.

---
## Tecnologias

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase_11-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)



## Link do sistema online

> _Preencher após o deploy_



---

## Funcionalidades

### Telemetria
- Exibe nível de bateria
- Exibe latência de rede
- Mostra missão em execução
- Registra horário da última atualização
- Emite alertas quando a bateria < 20%, latência > 100ms ou se existem missões com falha
- Botão de reinicialização quando bateria chega a zero

### Missões
- Cadastro com campos: origem, destino, tipo de carga, prioridade e distância
- Fila ordenada automaticamente: maior prioridade primeiro, menor distância em caso de empate
- Controle de status com transições válidas:
  - pendente -> em_execucao | cancelada
  - em_execucao -> concluida | falha
  - falha > pendente
  - concluida e cancelada não permitem novas transições
- Bloqueio de duas missões simultâneas em execução
- Próxima missão no topo da fila inicia automaticamente quando completa a atual

### Histórico
- Lista missões concluídas, canceladas e com falha
- Simulação de envio para API hospitalar com exibição do JSON

---

## Como rodar localmente

### Pré-requisitos
- Node.js 20 ou superior
- Conta no Firebase com projeto criado e Firestore ativado

### Passos

1. Clone o repositorio
```bash
git clone https://github.com/seu-usuario/top-frame-hospitalar.git
```

2. No diretório do projeto, rode o comando:
```bash
npm install
```

3. Rode o projeto
```bash
npm run dev
```
4.
```bash 
Acesse http://localhost:5173
```

5. É necessário configurar o arquivo firebase.js com  as suas credencias para garantir a permanência dos dados
> As credenciais são obtidas no console do Firebase em Configurações do projeto -> Seus aplicativos.

---

## Roteiro de testes manuais

### Teste 1 — Cadastro com validação
1. Acesse a aba **Missões**
2. Clique em **Cadastrar Missão** sem preencher nada
3. **Esperado:** mensagens de erro em todos os campos obrigatórios

### Teste 2 — Ordenação da fila
1. Cadastre duas missões pendentes: uma com prioridade 1 e outra com prioridade 3
2. **Esperado:** a missão de prioridade 3 fica em primeiro na fila

### Teste 3 — Transição de status inválida
1. Mude uma missão para **concluida**
2. **Esperado:** nenhum botão de ação disponível — transição bloqueada

### Teste 4 — Bloqueio de execução simultânea
1. Com uma missão já em execução, tente iniciar outra
2. **Esperado:** alerta "Já existe uma missão em execução"

### Teste 5 — Alerta de bateria
1. Aguarde a bateria cair abaixo de 20% na tela de **Telemetria**
2. **Esperado:** card da bateria muda para vermelho e alerta aparece no painel

### Teste 6 — Simulação de integração REST
1. Conclua ou cancele pelo menos uma missão
2. Acesse a aba **Histórico**
3. Clique em **Enviar tudo para API**
4. **Esperado:** Um painel com o JSON de todas as missões finalizadas exibido na tela

---

## Observações

- Nenhum dado real de pacientes ou hospitais foi utilizado. Todos os dados são fictícios.
- O uso de IA no desenvolvimento está documentado no arquivo `USO_IA.md`.