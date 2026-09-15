import { mockTeamStats } from '@/mocks/team.mock'
import { TeamStats } from '@/types/team.types'

export async function getTeamStats(): Promise<TeamStats> {
  return mockTeamStats
}
