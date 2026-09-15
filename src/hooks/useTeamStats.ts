import { useQuery } from '@tanstack/react-query'

import { getTeamStats } from '@/services/team.service'

export const teamStatsQueryKey = ['team', 'stats'] as const

export function useTeamStats() {
  return useQuery({
    queryKey: teamStatsQueryKey,
    queryFn: getTeamStats,
  })
}
