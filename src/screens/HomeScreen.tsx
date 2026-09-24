import { useMemo } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { PlayerCard } from '@/components/PlayerCard'
import { TeamStatsBanner } from '@/components/TeamStatsBanner'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Spacing } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { usePlayers } from '@/hooks/usePlayers'
import { useTeamStats } from '@/hooks/useTeamStats'
import { useFiltersStore } from '@/stores/useFiltersStore'
import { Batter, BattingStats, Pitcher, PitchingStats } from '@/types/player.types'

function formatRate(value: number): string {
  const fixed = value.toFixed(3)
  return value < 1 ? fixed.slice(1) : fixed
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <ThemedView type="backgroundElement" style={styles.statCard}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="smallBold">{value}</ThemedText>
    </ThemedView>
  )
}

function SectionHeader({ title }: { title: string }) {
  return <ThemedText type="smallBold">{title}</ThemedText>
}

export default function HomeScreen() {
  const theme = useTheme()
  const { season } = useFiltersStore()

  const { data: teamStats, isLoading: teamLoading, isError: teamError } = useTeamStats()
  const { data: players, isLoading: playersLoading, isError: playersError } = usePlayers()

  const isLoading = teamLoading || playersLoading
  const isError = teamError || playersError

  const topHitters = useMemo(() => {
    if (!players) return []
    return players
      .filter((p): p is Batter => p.role === 'batter')
      .filter((p): p is Batter & { stats: BattingStats } => p.stats !== null)
      .sort((a, b) => b.stats.ops - a.stats.ops)
      .slice(0, 3)
  }, [players])

  const topPitchers = useMemo(() => {
    if (!players) return []
    return players
      .filter((p): p is Pitcher => p.role === 'pitcher')
      .filter((p): p is Pitcher & { stats: PitchingStats } => p.stats !== null)
      .sort((a, b) => a.stats.era - b.stats.era)
      .slice(0, 3)
  }, [players])

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heading}>
            <ThemedText type="subtitle">Chicago Cubs</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Season {season}
            </ThemedText>
          </View>

          {isLoading && (
            <View style={styles.centered}>
              <ActivityIndicator color={theme.text} size="large" />
            </View>
          )}

          {isError && (
            <View style={styles.centered}>
              <ThemedText type="default" themeColor="textSecondary">
                Failed to load data. Please try again.
              </ThemedText>
            </View>
          )}

          {!isLoading && !isError && teamStats && (
            <>
              <TeamStatsBanner stats={teamStats} />

              <View style={styles.cardsGrid}>
                <StatCard
                  label="Record"
                  value={`${teamStats.wins} - ${teamStats.losses}`}
                />
                <StatCard
                  label="Runs"
                  value={`${teamStats.runsScored} / ${teamStats.runsAllowed}`}
                />
                <StatCard label="Home Runs" value={String(teamStats.homeRuns)} />
                <StatCard label="AVG" value={formatRate(teamStats.teamAvg)} />
                <StatCard label="OPS" value={formatRate(teamStats.teamOps)} />
                <StatCard label="ERA" value={teamStats.teamEra.toFixed(2)} />
              </View>

              <SectionHeader title="Top Hitters" />
              {topHitters.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}

              <SectionHeader title="Top Pitchers" />
              {topPitchers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  heading: {
    gap: Spacing.half,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  statCard: {
    flexBasis: '48%',
    flexGrow: 1,
    padding: Spacing.three,
    borderRadius: Spacing.two,
    gap: Spacing.half,
  },
  centered: {
    paddingVertical: Spacing.five,
    alignItems: 'center',
  },
})
