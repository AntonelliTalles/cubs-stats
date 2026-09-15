import { useQuery } from '@tanstack/react-query'

import { getPlayers } from '@/services/players.service'

export const playersQueryKey = ['players'] as const

export function usePlayers() {
  return useQuery({
    queryKey: playersQueryKey,
    queryFn: getPlayers,
  })
}
