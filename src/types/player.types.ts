export interface BattingStats {
  games: number
  atBats: number
  runs: number
  hits: number
  doubles: number
  triples: number
  homeRuns: number
  rbi: number
  stolenBases: number
  walks: number
  strikeouts: number
  avg: number
  obp: number
  slg: number
  ops: number
}

export interface PitchingStats {
  wins: number
  losses: number
  era: number
  games: number
  gamesStarted: number
  inningsPitched: number
  hitsAllowed: number
  runsAllowed: number
  earnedRuns: number
  walks: number
  strikeouts: number
  whip: number
  saves: number
}

interface PlayerBase {
  id: number
  name: string
  number: number | null
  position: string
  bats: string | null
  throws: string | null
  age: number | null
}

export interface Batter extends PlayerBase {
  role: 'batter'
  stats: BattingStats | null
}

export interface Pitcher extends PlayerBase {
  role: 'pitcher'
  stats: PitchingStats | null
}

export type Player = Batter | Pitcher
