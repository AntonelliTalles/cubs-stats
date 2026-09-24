import { useQuery } from '@tanstack/react-query'

import { getPlayerById } from '@/services/players.service'

export const playerQueryKey = (id: number) => ['players', id] as const

export function usePlayer(id: number) {
  return useQuery({
    queryKey: playerQueryKey(id),
    queryFn: () => getPlayerById(id),
    enabled: Number.isFinite(id),
  })
}
