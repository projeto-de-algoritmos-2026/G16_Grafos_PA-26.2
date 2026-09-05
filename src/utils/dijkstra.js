/**
 * Min-Heap para controle de prioridade O(log n)
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(element) {
    this.heap.push(element);
    this._shiftUp(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._shiftDown(0);
    }
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _shiftUp(idx) {
    let current = idx;
    while (current > 0) {
      const parentIdx = Math.floor((current - 1) / 2);
      if (this.heap[current].cost < this.heap[parentIdx].cost) {
        [this.heap[current], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[current]];
        current = parentIdx;
      } else {
        break;
      }
    }
  }

  _shiftDown(idx) {
    let current = idx;
    const length = this.heap.length;

    while (true) {
      let left = 2 * current + 1;
      let right = 2 * current + 2;
      let smallest = current;

      if (left < length && this.heap[left].cost < this.heap[smallest].cost) {
        smallest = left;
      }
      if (right < length && this.heap[right].cost < this.heap[smallest].cost) {
        smallest = right;
      }
      if (smallest !== current) {
        [this.heap[current], this.heap[smallest]] = [this.heap[smallest], this.heap[current]];
        current = smallest;
      } else {
        break;
      }
    }
  }
}

/**
 * Executa o Algoritmo de Dijkstra no grafo do Darcy Ribeiro
 * 
 * @param {Object} graphData - Grafo exportado de graphData.js
 * @param {string} startNode - Vértice de Origem (ex: "ICC_Norte")
 * @param {string} endNode - Vértice de Destino (ex: "FACE")
 * @returns {Object} { distance, path, visitedNodes, success, message }
 */
export function dijkstra(graphData, startNode, endNode) {
  if (!graphData || !graphData[startNode] || !graphData[endNode]) {
    return {
      distance: Infinity,
      path: [],
      visitedNodes: [],
      success: false,
      message: 'Origem ou destino não encontrados no grafo do Darcy Ribeiro.'
    };
  }

  if (startNode === endNode) {
    return {
      distance: 0,
      path: [startNode],
      visitedNodes: [startNode],
      success: true,
      message: 'Origem e destino são o mesmo local.'
    };
  }

  const distances = {};
  const previous = {};
  const visitedOrder = [];
  const visitedSet = new Set();
  const pq = new MinHeap();

  for (const node of Object.keys(graphData)) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[startNode] = 0;
  pq.push({ id: startNode, cost: 0 });

  while (!pq.isEmpty()) {
    const { id: current, cost: currentDist } = pq.pop();

    if (visitedSet.has(current)) continue;
    visitedSet.add(current);
    visitedOrder.push(current);

    if (current === endNode) break;

    const rawNeighbors = graphData[current] || {};

    // Normaliza tanto para dicionário { Vizinho: Peso } quanto para Array [{ node, cost }]
    const neighborsList = Array.isArray(rawNeighbors)
      ? rawNeighbors.map(n => ({ node: n.node, weight: n.cost || n.weight || 1 }))
      : Object.entries(rawNeighbors).map(([node, weight]) => ({ node, weight }));

    for (const { node: neighborId, weight } of neighborsList) {
      if (!visitedSet.has(neighborId)) {
        const newDist = currentDist + weight;

        if (newDist < distances[neighborId]) {
          distances[neighborId] = newDist;
          previous[neighborId] = current;
          pq.push({ id: neighborId, cost: newDist });
        }
      }
    }
  }

  if (distances[endNode] === Infinity) {
    return {
      distance: Infinity,
      path: [],
      visitedNodes: visitedOrder,
      success: false,
      message: 'Não existe caminho entre os dois prédios selecionados.'
    };
  }

  const path = [];
  let curr = endNode;
  while (curr !== null) {
    path.unshift(curr);
    curr = previous[curr];
  }

  return {
    distance: distances[endNode],
    path,
    visitedNodes: visitedOrder,
    success: true
  };
}