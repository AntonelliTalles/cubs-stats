// Contrato exposto pela nossa Sports API (GET /teams/cubs/players).
// Estes tipos espelham fielmente o backend, inclusive nullability — não são
// o domínio do mobile (@/types/player.types) e não têm nenhuma relação com a
// MLB Stats API, que o mobile não deve conhecer.

export type ApiPlayerRole = 'batter' | 'pitcher'

interface ApiPlayerBase {
  id: number
  name: string
  number: number | null
  position: string
  bats: string | null
  throws: string | null
  age: number | null
}

export interface ApiBatterStats {
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

export interface ApiPitcherStats {
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

export interface ApiBatter extends ApiPlayerBase {
  role: 'batter'
  stats: ApiBatterStats | null
}

export interface ApiPitcher extends ApiPlayerBase {
  role: 'pitcher'
  stats: ApiPitcherStats | null
}

export type ApiPlayer = ApiBatter | ApiPitcher

export interface PlayersApiResponse {
  team: string
  season: number
  players: ApiPlayer[]
}
