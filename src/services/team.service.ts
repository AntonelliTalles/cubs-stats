import { api } from '@/services/api'
import { TeamStats } from '@/types/team.types'

const CUBS_TEAM_STATS_ENDPOINT = '/teams/cubs/stats'

export async function getTeamStats(): Promise<TeamStats> {
  const response = await api.get<TeamStats>(CUBS_TEAM_STATS_ENDPOINT)
  return response.data
}
