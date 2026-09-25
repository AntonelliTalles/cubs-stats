import { api } from '@/services/api'
import { PlayersApiResponse } from '@/types/players.api.types'

const CUBS_PLAYERS_ENDPOINT = '/teams/cubs/players'

export async function getPlayersResponse(): Promise<PlayersApiResponse> {
  const response = await api.get<PlayersApiResponse>(CUBS_PLAYERS_ENDPOINT)
  return response.data
}
