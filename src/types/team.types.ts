export interface TeamRecord {
  wins: number
  losses: number
  winPercentage: number
}

export interface TeamBattingStats {
  runsScored: number
  homeRuns: number
  avg: number
  obp: number
  slg: number
  ops: number
}

export interface TeamPitchingStats {
  runsAllowed: number
  era: number
}

// Contrato de GET /teams/cubs/stats na nossa Sports API — regular season.
// record/batting/pitching podem ser null independentemente (dado ausente,
// nunca zero fabricado). team/season já vêm normalizados; a Home usa a
// season do fluxo de /teams/cubs/players como fonte de exibição (ver
// usePlayersMeta) para não ter duas fontes de verdade competindo na UI.
export interface TeamStats {
  team: string
  season: number
  record: TeamRecord | null
  batting: TeamBattingStats | null
  pitching: TeamPitchingStats | null
}
