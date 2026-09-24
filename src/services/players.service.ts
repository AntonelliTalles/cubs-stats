import { mockPlayers } from '@/mocks/players.mock'
import { api } from '@/services/api'
import { Player } from '@/types/player.types'
import { PlayersApiResponse } from '@/types/players.api.types'

const CUBS_PLAYERS_ENDPOINT = '/teams/cubs/players'

export async function getPlayers(): Promise<Player[]> {
  return mockPlayers
}

export async function getPlayerById(id: string): Promise<Player> {
  const player = mockPlayers.find((p) => p.id === id)
  if (!player) {
    throw new Error(`Player not found: ${id}`)
  }
  return player
}

// Calls the Sports API directly and returns its raw contract (PlayersApiResponse),
// not the mobile domain Player[]. Not yet wired into usePlayers/PlayersScreen.
export async function getPlayersFromSportsApi(): Promise<PlayersApiResponse> {
  const response = await api.get<PlayersApiResponse>(CUBS_PLAYERS_ENDPOINT)
  return response.data
}
