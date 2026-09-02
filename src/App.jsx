import { useState } from 'react';
import './index.css';
// Importaremos o algoritmo e os dados depois, quando o Daniel terminar:
// import { dijkstra } from './utils/dijkstra';
// import { graphData } from './data/graphData';

// Mock temporário para você testar a UI enquanto o grafo real não fica pronto
const mockNodes = ['Ponto A', 'Ponto B', 'Ponto C', 'Ponto D', 'Ponto E'];

function App() {
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculateRoute = (e) => {
    e.preventDefault();
    
    if (!startNode || !endNode) {
      alert("Por favor, selecione a origem e o destino.");
      return;
    }

    if (startNode === endNode) {
      alert("A origem e o destino não podem ser iguais.");
      return;
    }

    // Aqui entra a integração com a Parte A no futuro:
    // const routeResult = dijkstra(graphData, startNode, endNode);
    // setResult(routeResult);

    // Mock do resultado para você já ir estilizando:
    setResult({
      path: [startNode, 'Ponto X', 'Ponto Y', endNode],
      cost: 15.5
    });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🗺️ Otimizador de Rotas logísticas</h1>
        <p>Encontre o menor caminho utilizando o Algoritmo de Dijkstra</p>
      </header>

      <main className="main-content">
        <section className="card form-section">
          <h2>Definir Rota</h2>
          <form onSubmit={handleCalculateRoute}>
            <div className="input-group">
              <label htmlFor="start">Origem:</label>
              <select 
                id="start" 
                value={startNode} 
                onChange={(e) => setStartNode(e.target.value)}
              >
                <option value="">Selecione...</option>
                {mockNodes.map(node => (
                  <option key={node} value={node}>{node}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="end">Destino:</label>
              <select 
                id="end" 
                value={endNode} 
                onChange={(e) => setEndNode(e.target.value)}
              >
                <option value="">Selecione...</option>
                {mockNodes.map(node => (
                  <option key={node} value={node}>{node}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-primary">Calcular Rota</button>
          </form>
        </section>

        {result && (
          <section className="card result-section">
            <h2>Resultado da Rota</h2>
            <div className="result-info">
              <p><strong>Custo Total (Distância/Tempo):</strong> <span className="highlight">{result.cost}</span></p>
              
              <h3>Caminho Passo a Passo:</h3>
              <div className="path-display">
                {result.path.map((step, index) => (
                  <span key={index} className="path-step">
                    {step}
                    {index < result.path.length - 1 && <span className="arrow"> ➔ </span>}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;