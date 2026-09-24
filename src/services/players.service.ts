import { mockPlayers } from '@/mocks/players.mock'
import { api } from '@/services/api'
import { Player } from '@/types/player.types'
import { PlayersApiResponse } from '@/types/players.api.types'

const CUBS_PLAYERS_ENDPOINT = '/teams/cubs/players'

export async function getPlayers(): Promise<Player[]> {
  const response = await api.get<PlayersApiResponse>(CUBS_PLAYERS_ENDPOINT)
  return response.data.players
}

// Mock-backed: the Sports API doesn't expose a single-player endpoint yet and
// no screen consumes this. Left isolated rather than inventing an endpoint.
export async function getPlayerById(id: number): Promise<Player> {
  const player = mockPlayers.find((p) => p.id === id)
  if (!player) {
    throw new Error(`Player not found: ${id}`)
  }
  return player
}
