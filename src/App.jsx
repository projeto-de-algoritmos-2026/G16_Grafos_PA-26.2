import { useState } from 'react';
import './index.css';
import { graph } from './utils/graphData';
import { dijkstra } from './utils/dijkstra';

function App() {
  const [startNode, setStartNode] = useState('');
  const [endNode, setEndNode] = useState('');
  const [result, setResult] = useState(null);

  // Extrai os vértices reais do seu grafo para preencher os selects
  const realNodes = Object.keys(graph);

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

    // Executa a busca real pelo menor caminho
    const routeResult = dijkstra(graph, startNode, endNode);

    if (!routeResult || routeResult.distance === Infinity) {
      alert("Não foi possível encontrar uma rota entre esses pontos.");
      return;
    }

    // Atualiza a interface com o formato esperado pelo layout do seu parceiro
    setResult({
      path: routeResult.path,
      cost: `${routeResult.distance} metros`
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
                {realNodes.map(node => (
                  <option key={node} value={node}>{node.replace('_', ' ')}</option>
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
                {realNodes.map(node => (
                  <option key={node} value={node}>{node.replace('_', ' ')}</option>
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
              <p><strong>Custo Total (Distância):</strong> <span className="highlight">{result.cost}</span></p>
              
              <h3>Caminho Passo a Passo:</h3>
              <div className="path-display">
                {result.path.map((step, index) => (
                  <span key={index} className="path-step">
                    {step.replace('_', ' ')}
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