export type BatHandedness = 'L' | 'R' | 'S'
export type ThrowHandedness = 'L' | 'R'

export type FieldingPosition = 'C' | '1B' | '2B' | '3B' | 'SS' | 'LF' | 'CF' | 'RF' | 'DH'
export type PitchingPosition = 'SP' | 'RP' | 'CL'
export type Position = FieldingPosition | PitchingPosition

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
  id: string
  name: string
  number: number
  bats: BatHandedness
  throws: ThrowHandedness
  age: number
}

export interface Batter extends PlayerBase {
  role: 'batter'
  position: FieldingPosition
  stats: BattingStats
}

export interface Pitcher extends PlayerBase {
  role: 'pitcher'
  position: PitchingPosition
  stats: PitchingStats
}

export type Player = Batter | Pitcher
