import { mockPlayers } from '@/mocks/players.mock'
import { Player } from '@/types/player.types'

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
