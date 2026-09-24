import { useQuery } from '@tanstack/react-query'

import { getPlayersResponse } from '@/services/players.service'

export const playersQueryKey = ['players'] as const

export function usePlayers() {
  return useQuery({
    queryKey: playersQueryKey,
    queryFn: getPlayersResponse,
    select: (response) => response.players,
  })
}

// Reads the same cached GET /teams/cubs/players response as usePlayers — no
// extra request, just a different view (team/season instead of the roster).
export function usePlayersMeta() {
  return useQuery({
    queryKey: playersQueryKey,
    queryFn: getPlayersResponse,
    select: (response) => ({ team: response.team, season: response.season }),
  })
}
