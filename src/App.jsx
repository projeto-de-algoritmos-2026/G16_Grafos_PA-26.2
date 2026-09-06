import React, { useState, useMemo } from 'react';
import { graph } from './utils/graphData';
import { dijkstra } from './utils/dijkstra';

// Coordenadas relativas dos 18 prédios no mapa esquemático do Darcy Ribeiro
// Coordenadas calibradas baseadas no mapa oficial (2024)
// Coordenadas calibradas baseadas no mapa oficial (2024)
const buildingPositions = {
  // Setor Sul (Esquerda)
  "FE": { x: 140, y: 140, name: "FE - Faculdade de Educação" },
  "FS": { x: 120, y: 280, name: "FS - Faculdade de Saúde" },
  "IB": { x: 160, y: 360, name: "IB - Instituto de Biologia" },
  "IQ": { x: 230, y: 400, name: "IQ - Instituto de Química" },

  // Eixo Central (Ajustado para evitar sobreposição de textos)
  "ICC_Sul": { x: 230, y: 260, name: "ICC Sul" },
  "ICC_Centro": { x: 395, y: 245, name: "ICC Centro" }, // Movido para a direita
  "ICC_Norte": { x: 510, y: 240, name: "ICC Norte" },
  "RU": { x: 310, y: 155, name: "RU - Restaurante Universitário" }, // Movido para cima/esquerda
  "Reitoria": { x: 290, y: 330, name: "Reitoria" },
  "BCE": { x: 395, y: 330, name: "BCE - Biblioteca Central" }, // Alinhado com ICC_Centro
  "IF": { x: 320, y: 420, name: "IF - Instituto de Física" },
  "MAT": { x: 410, y: 410, name: "MAT - Matemática" },

  // Setor Norte (Direita)
  "PAT": { x: 440, y: 130, name: "PAT - Pavilhão Anísio Teixeira" },
  "FT": { x: 500, y: 150, name: "FT - Faculdade de Tecnologia" },
  "PJC": { x: 580, y: 200, name: "PJC - Pavilhão João Calmon" },
  "FD": { x: 580, y: 140, name: "FD - Faculdade de Direito" },
  "FACE": { x: 640, y: 150, name: "FACE - Economia e Admin." },
  "BSAN": { x: 690, y: 180, name: "BSAN - Biblioteca Setorial Norte" }
};

export default function App() {
  const sortedNodes = useMemo(() => {
    return Object.keys(graph).sort((a, b) => {
      const nameA = buildingPositions[a]?.name || a;
      const nameB = buildingPositions[b]?.name || b;
      return nameA.localeCompare(nameB);
    });
  }, []);

  const [origin, setOrigin] = useState(sortedNodes[0] || '');
  const [destination, setDestination] = useState(sortedNodes[1] || '');
  const [routeResult, setRouteResult] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!origin || !destination) return;
    const result = dijkstra(graph, origin, destination);
    setRouteResult(result);
  };

  const isEdgeInPath = (u, v) => {
    if (!routeResult || !routeResult.path || routeResult.path.length < 2) return false;
    const p = routeResult.path;
    const idxU = p.indexOf(u);
    const idxV = p.indexOf(v);
    return idxU !== -1 && idxV !== -1 && Math.abs(idxU - idxV) === 1;
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🏛️ Roteador Campus Darcy Ribeiro</h1>
        <p>Encontre o menor caminho entre os prédios da UnB com o Algoritmo de Dijkstra</p>
      </header>

      <main className="main-content">
        {/* Formulário e Resultados */}
        <section className="controls-section">
          <div className="card">
            <h2>Definir Rota</h2>
            <form onSubmit={handleCalculate} className="form-group">
              <label>
                Origem:
                <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
                  {sortedNodes.map((node) => (
                    <option key={`orig-${node}`} value={node}>
                      {buildingPositions[node]?.name || node}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Destino:
                <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                  {sortedNodes.map((node) => (
                    <option key={`dest-${node}`} value={node}>
                      {buildingPositions[node]?.name || node}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className="btn-primary">
                Calcular Rota
              </button>
            </form>
          </div>

          {routeResult && (
            <div className="card result-card">
              <h2>Resultado da Rota</h2>
              {routeResult.success ? (
                <>
                  <div className="distance-badge">
                    <span>Distância Total:</span>
                    <strong>{routeResult.distance} metros</strong>
                  </div>

                  <div className="path-container">
                    <span className="path-label">Caminho Passo a Passo:</span>
                    <div className="path-tags">
                      {routeResult.path.map((node, index) => (
                        <React.Fragment key={node}>
                          <span className="node-tag">
                            {buildingPositions[node]?.name || node}
                          </span>
                          {index < routeResult.path.length - 1 && (
                            <span className="path-arrow">➔</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="error-text">{routeResult.message}</p>
              )}
            </div>
          )}
        </section>

        {/* Mapa do Grafo em SVG */}
        <section className="graph-section">
          <div className="card graph-card">
            <h2>Mapa do Grafo (Distâncias Reais em Metros)</h2>
            <div className="svg-wrapper">
              <svg viewBox="0 0 740 500" className="graph-svg">
                {/* Arestas */}
                {Object.entries(graph).map(([u, neighbors]) =>
                  Object.entries(neighbors).map(([v, weight]) => {
                    if (!buildingPositions[u] || !buildingPositions[v] || u > v) return null;
                    const inPath = isEdgeInPath(u, v);
                    const p1 = buildingPositions[u];
                    const p2 = buildingPositions[v];
                    return (
                      <line
                        key={`edge-${u}-${v}`}
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        className={inPath ? 'edge-line active-edge' : 'edge-line'}
                      />
                    );
                  })
                )}

                {/* Badges de Peso */}
                {Object.entries(graph).map(([u, neighbors]) =>
                  Object.entries(neighbors).map(([v, weight]) => {
                    if (!buildingPositions[u] || !buildingPositions[v] || u > v) return null;
                    const inPath = isEdgeInPath(u, v);
                    const p1 = buildingPositions[u];
                    const p2 = buildingPositions[v];
                    const midX = (p1.x + p2.x) / 2;
                    const midY = (p1.y + p2.y) / 2;

                    return (
                      <g key={`weight-${u}-${v}`} transform={`translate(${midX}, ${midY})`}>
                        <rect
                          x="-18"
                          y="-9"
                          width="36"
                          height="18"
                          rx="4"
                          className={inPath ? 'edge-badge-bg active-badge-bg' : 'edge-badge-bg'}
                        />
                        <text
                          y="3.5"
                          className={inPath ? 'edge-weight-text active-weight-text' : 'edge-weight-text'}
                        >
                          {weight}m
                        </text>
                      </g>
                    );
                  })
                )}

                {/* Vértices */}
                {Object.entries(buildingPositions).map(([id, pos]) => {
                  const isInPath = routeResult?.path?.includes(id);
                  const isStart = routeResult?.path?.[0] === id;
                  const isEnd = routeResult?.path?.[routeResult.path.length - 1] === id;

                  let nodeClass = 'node-circle';
                  if (isStart) nodeClass += ' node-start';
                  else if (isEnd) nodeClass += ' node-end';
                  else if (isInPath) nodeClass += ' node-path';

                  return (
                    <g key={`node-${id}`} transform={`translate(${pos.x}, ${pos.y})`}>
                      <circle r={isInPath ? 13 : 8.5} className={nodeClass} />
                      <text y={-14} className={isInPath ? 'node-text text-active' : 'node-text'}>
                        {id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}