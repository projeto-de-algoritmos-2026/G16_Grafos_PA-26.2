export default function GraphCanvas({ graph, path = [] }) {
  // Posições (x, y) normalizadas num canvas 800x400
  const positions = {
    "ICC_Norte": { x: 300, y: 80 },
    "ICC_Centro": { x: 300, y: 160 },
    "ICC_Sul": { x: 300, y: 240 },
    "FT": { x: 180, y: 60 },
    "FA": { x: 100, y: 100 },
    "BSAN": { x: 100, y: 200 },
    "PAT": { x: 180, y: 220 },
    "BCE": { x: 420, y: 160 },
    "Reitoria": { x: 420, y: 240 },
    "FACE": { x: 520, y: 300 },
    "FD": { x: 600, y: 300 },
    "FE": { x: 600, y: 220 },
    "Uleg": { x: 420, y: 320 },
    "RU": { x: 300, y: 330 },
    "FS": { x: 200, y: 340 },
    "IB": { x: 180, y: 400 },
    "IQ": { x: 300, y: 400 },
    "IF": { x: 420, y: 400 },
    "MAT": { x: 520, y: 400 },
    "PJC": { x: 420, y: 80 }
  };

  const isEdgeInPath = (u, v) => {
    const idxU = path.indexOf(u);
    const idxV = path.indexOf(v);
    return idxU !== -1 && idxV !== -1 && Math.abs(idxU - idxV) === 1;
  };

  return (
    <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginTop: '20px' }}>
      <svg viewBox="0 0 700 460" style={{ width: '100%', height: 'auto' }}>
        {/* Renderiza Arestas */}
        {Object.entries(graph).map(([u, neighbors]) =>
          Object.keys(neighbors).map((v) => {
            if (!positions[u] || !positions[v] || u > v) return null;
            const inPath = isEdgeInPath(u, v);
            return (
              <line
                key={`${u}-${v}`}
                x1={positions[u].x}
                y1={positions[u].y}
                x2={positions[v].x}
                y2={positions[v].y}
                stroke={inPath ? '#2563eb' : '#cbd5e1'}
                strokeWidth={inPath ? 4 : 1.5}
              />
            );
          })
        )}

        {/* Renderiza Vértices */}
        {Object.entries(positions).map(([node, pos]) => {
          const inPath = path.includes(node);
          return (
            <g key={node} transform={`translate(${pos.x}, ${pos.y})`}>
              <circle
                r={inPath ? 14 : 9}
                fill={inPath ? '#2563eb' : '#64748b'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text
                y={-14}
                textAnchor="middle"
                fontSize="11"
                fontWeight={inPath ? 'bold' : 'normal'}
                fill={inPath ? '#1e293b' : '#64748b'}
              >
                {node}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}