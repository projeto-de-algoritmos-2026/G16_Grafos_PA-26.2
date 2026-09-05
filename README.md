# 🗺️ Roteador Darcy Ribeiro - Dijkstra com Min-Heap

**Disciplina:** Projeto de Algoritmos  
**Módulo:** 1 - Grafos  
**Professor:** Maurício Serrano  

Aplicação web interativa desenvolvida em **React + Vite** que calcula a rota mais curta entre os principais prédios e centros acadêmicos do **Campus Darcy Ribeiro (UnB)**. O projeto utiliza o **Algoritmo de Dijkstra otimizado com Fila de Prioridades (Min-Heap)** sobre uma malha com 20 nós e distâncias reais em metros.

---

## 👥 Dupla

| Matrícula | Aluno | Responsabilidade Principal |
| :---: | :--- | :--- |
| `241012374` | Rodrigo Henrique Donato | **Membro B:** Lógica do Dijkstra, Min-Heap e Validações |
| `241025505` | Daniel de Oliveira | **Membro A:** Modelagem do Grafo Darcy Ribeiro e Frontend/UI |

---

## 🎥 Apresentação em Vídeo

> 🔗 **Link do Vídeo:** [Adicionar link do YouTube/Drive aqui]

O vídeo de até 5 minutos aborda a modelagem do grafo da UnB, os detalhes técnicos da fila de prioridade com Min-Heap no Dijkstra e a demonstração completa da aplicação em execução.

---

## 📸 Screenshots da Aplicação

*(Insira aqui as capturas de tela da interface calculando rotas no campus)*

---

## 🚀 Instalação e Execução

Para rodar o projeto localmente, certifique-se de ter o [Node.js](https://nodejs.org/) instalado.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/projeto-de-algoritmos-2026/G16_Grafos_PA-26.2.git](https://github.com/projeto-de-algoritmos-2026/G16_Grafos_PA-26.2.git)

```

2. **Acesse a pasta do projeto:**
```bash
cd G16_Grafos_PA-26.2

```


3. **Instale as dependências:**
```bash
npm install

```


4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev

```


5. **Acesse no navegador:**
Abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

---

## 📁 Estrutura de Pastas

```text
📦 G16_Grafos_PA-26.2
 ┣ 📂 public               # Recursos estáticos globais
 ┣ 📂 src                  # Código-fonte principal
 ┃ ┣ 📂 utils              # Lógica algorítmica e estruturas de dados
 ┃ ┃ ┣ 📜 dijkstra.js      # Dijkstra com Min-Heap e tratamento de bordas
 ┃ ┃ ┗ 📜 graphData.js     # Grafo com 20 nós do Campus Darcy Ribeiro (UnB)
 ┃ ┣ 📜 App.jsx            # Interface visual e controle de estados React
 ┃ ┣ 📜 index.css          # Estilização global da aplicação
 ┃ ┗ 📜 main.jsx           # Ponto de entrada da aplicação
 ┣ 📜 package.json         # Dependências e scripts do projeto
 ┣ 📜 README.md            # Documentação técnica do projeto
 ┗ 📜 vite.config.js       # Configuração do bundler Vite

```

---

## 🧠 Modelagem e Algoritmo

### 1. O Grafo do Campus Darcy Ribeiro

O campus foi modelado como um grafo não-direcionado e ponderado $G = (V, E)$ contendo:

* **20 Vértices ($|V| = 20$):** Prédios e pontos de referência (ICC Norte/Centro/Sul, BCE, RU, FT, PAT, BSAN, PJC, FA, Reitoria, FS, IB, IQ, IF, MAT, FE, FD, FACE e Uleg).
* **Arestas ($E$):** Vias de pedestres e caminhos asfaltados conectando os prédios adjacentes.
* **Pesos ($w$):** Distância aproximada de deslocamento a pé medida em metros.

### 2. Algoritmo de Dijkstra com Min-Heap

A busca pela rota ótima utiliza o Algoritmo de Dijkstra implementado do zero com uma **Fila de Prioridades baseada em Min-Heap Binário**:

* **Complexidade Temporal:** $O((|V| + |E|) \log |V|)$, garantindo eficiência superior à abordagem ingênua com array $O(|V|^2)$.


* **Operações de Heap:** Implementação manual de `Shift Up` para inserção/atualização de prioridade e `Shift Down` na remoção do elemento mínimo (`ExtractMin`).


* **Reconstrução de Caminho:** Utilização de vetor de predecessores (`previous[]`) para traçar a rota exata da origem até o destino.


* **Tratamento de Casos de Borda:** Validações ativas para pontos coincidentes (distância zero), nós inválidos e grafos desconexos.

```