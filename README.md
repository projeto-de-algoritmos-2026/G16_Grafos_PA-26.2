# 🗺️ Roteamento de Entregas - Dijkstra (Grafos)

**Disciplina:** Projeto de Algoritmos  
**Módulo:** 1 - Grafos  
**Professor:** Maurício Serrano  

Este projeto é uma aplicação interativa desenvolvida em React + Vite que utiliza o Algoritmo de Dijkstra para encontrar o menor caminho entre pontos de distribuição e entrega. O objetivo é demonstrar a aplicação prática de grafos na otimização de rotas logísticas.

## 👥 Dupla

| Matrícula | Aluno |
| :---: | :--- |
| `241012374` | `Rodrigo Henrique Donato` |
| `241025505` | `Daniel de Oliveira` |

## 🎥 Apresentação em Vídeo

> **[Link para o vídeo de apresentação no YouTube/Drive]** A DEFINIR AINDA

O vídeo de até 5 minutos apresenta a modelagem do grafo, a explicação da implementação do algoritmo de Dijkstra e a demonstração da aplicação em funcionamento.

---

## 🚀 Instalação e Execução

A aplicação foi construída utilizando **React** e **Vite**. Para rodar o projeto localmente, é necessário ter o [Node.js](https://nodejs.org/) instalado na sua máquina.

### Passos para rodar o projeto:

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/projeto-de-algoritmos-2026/G16_Grafos_PA-26.2](https://github.com/projeto-de-algoritmos-2026/G16_Grafos_PA-26.2)
```

2. **Acesse a pasta do projeto:**
```bash
cd G16_Grafos_PA-26.2

```


3. **Instale as dependências necessárias:**
```bash
npm install

```


4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev

```


5. **Acesse no navegador:**
O terminal exibirá um link local (geralmente `http://localhost:5173`). Clique no link para abrir a aplicação.

---

## 📁 Estrutura de Pastas

A organização do projeto segue uma estrutura modular padrão para aplicações React+Vite, separando a lógica do algoritmo, os dados estáticos e os componentes visuais:

```text
📦 G16_Grafos_PA-26.2
 ┣ 📂 public               # Arquivos estáticos globais (ícones, imagens)
 ┣ 📂 src                  # Código-fonte principal
 ┃ ┣ 📂 assets             # Imagens e recursos visuais usados nos componentes
 ┃ ┣ 📂 components         # Componentes React (ex: RouteForm.jsx, PathDisplay.jsx)
 ┃ ┣ 📂 data               # Arquivos de dados estáticos
 ┃ ┃ ┗ 📜 graphData.js     # Modelação do grafo (nós e arestas com pesos)
 ┃ ┣ 📂 utils              # Funções utilitárias e algoritmos
 ┃ ┃ ┗ 📜 dijkstra.js      # Implementação manual do algoritmo de Dijkstra
 ┃ ┣ 📜 App.jsx            # Componente raiz da interface
 ┃ ┣ 📜 index.css          # Estilização global
 ┃ ┗ 📜 main.jsx           # Ponto de entrada do React
 ┣ 📜 .gitignore           # Arquivos ignorados pelo Git (ex: node_modules)
 ┣ 📜 index.html           # Template HTML principal
 ┣ 📜 package.json         # Dependências e scripts de execução do Node
 ┣ 📜 README.md            # Documentação do projeto
 ┗ 📜 vite.config.js       # Configurações do Vite

```

---

## 🧠 Sobre o Algoritmo (Dijkstra)

O algoritmo de Dijkstra soluciona o problema do caminho mais curto em um grafo direcionado ou não direcionado com arestas de peso não negativo.

No contexto deste projeto:

* **Vértices (Nós):** Representam os pontos de distribuição e os locais de entrega.
* **Arestas:** Representam as vias/ruas conectando esses pontos.
* **Pesos:** Representam a distância (ou o tempo) necessário para atravessar a via.

A implementação manual localizada em `src/utils/dijkstra.js` utiliza uma lista de adjacência e calcula progressivamente o custo mínimo acumulado a partir do nó de origem até todos os outros nós alcançáveis, retraçando o caminho ótimo ao final da execução.

