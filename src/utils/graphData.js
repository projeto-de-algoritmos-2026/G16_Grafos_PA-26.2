// src/utils/graphData.js

export const graph = {
  "ICC_Norte": { "ICC_Centro": 300, "FT": 150, "PJC": 200, "PAT": 250 },
  "ICC_Centro": { "ICC_Norte": 300, "ICC_Sul": 300, "BCE": 150, "IB": 200 },
  "ICC_Sul": { "ICC_Centro": 300, "RU": 200, "ULEG_FT": 150, "FS": 250 },
  "BCE": { "ICC_Centro": 150, "Reitoria": 250, "RU": 450 },
  "RU": { "ICC_Sul": 200, "BCE": 450, "FS": 150 },
  "FT": { "ICC_Norte": 150, "FAU": 100, "PAT": 300 },
  "FAU": { "FT": 100, "BSAN": 200 },
  "Reitoria": { "BCE": 250, "FACE": 400, "PAT": 350 },
  "PAT": { "ICC_Norte": 250, "FT": 300, "Reitoria": 350, "PJC": 100, "BSAN": 150, "FD": 140 },
  "PJC": { "ICC_Norte": 200, "PAT": 100, "MAT": 250 },
  "BSAN": { "FAU": 200, "PAT": 150 },
  "FS": { "RU": 150, "ICC_Sul": 250, "IB": 200 },
  "IB": { "ICC_Centro": 200, "FS": 200, "IQ": 100 },
  "IQ": { "IB": 100, "IF": 100 },
  "IF": { "IQ": 100, "MAT": 150 },
  "MAT": { "IF": 150, "PJC": 250 },
  "FE": { "ULEG_FT": 200, "FD": 250 },
  "FD": { "FE": 250, "FACE": 100, "PAT": 140 },
  "FACE": { "FD": 100, "Reitoria": 400 },
  "ULEG_FT": { "ICC_Sul": 150, "FE": 200 }
};