import { Player } from '@/types/player.types'

// Envelope de transporte de GET /teams/cubs/players na nossa Sports API.
// O formato de cada jogador já É o domínio mobile (Player) — a Sports API
// normaliza a MLB antes de entregar dados ao mobile, então não há DTO
// separado para duplicar aqui.
export interface PlayersApiResponse {
  team: string
  season: number
  players: Player[]
}
