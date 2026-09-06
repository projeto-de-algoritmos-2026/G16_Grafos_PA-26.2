// src/utils/graphData.js

export const graph = {
  "ICC_Norte": { "ICC_Centro": 295, "FT": 243, "PJC": 311, "PAT": 243 },
  "ICC_Centro": { "ICC_Norte": 295, "ICC_Sul": 360, "BCE": 703, "IB": 322 },
  "ICC_Sul": { "ICC_Centro": 360, "RU": 449, "ULEG_FT": 213, "FS": 260 },
  "BCE": { "ICC_Centro": 703, "Reitoria": 424, "RU": 333 },
  "RU": { "ICC_Sul": 449, "BCE": 333, "FS": 419 },
  "FT": { "ICC_Norte": 243, "FAU": 408, "PAT": 287 },
  "FAU": { "FT": 408, "BSAN": 618 },
  "Reitoria": { "BCE": 424, "FACE": 1167, "PAT": 822 },
  "PAT": { "ICC_Norte": 243, "FT": 287, "Reitoria": 822, "PJC": 208, "BSAN": 254, "FD": 322 },
  "PJC": { "ICC_Norte": 311, "PAT": 208, "MAT": 570 },
  "BSAN": { "FAU": 618, "PAT": 254 },
  "FS": { "RU": 419, "ICC_Sul": 260, "IB": 510 },
  "IB": { "ICC_Centro": 322, "FS": 510, "IQ": 297 },
  "IQ": { "IB": 297, "IF": 153 },
  "IF": { "IQ": 153, "MAT": 56 },
  "MAT": { "IF": 56, "PJC": 570 },
  "FE": { "ULEG_FT": 695, "FD": 1432 },
  "FD": { "FE": 1432, "FACE": 443, "PAT": 322 },
  "FACE": { "FD": 443, "Reitoria": 1167 },
  "ULEG_FT": { "ICC_Sul": 213, "FE": 695 }
};