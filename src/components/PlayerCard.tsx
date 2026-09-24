import { StyleSheet, View } from 'react-native'

import { Spacing } from '@/constants/theme'
import { Batter, Pitcher, Player } from '@/types/player.types'

import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'

type PlayerCardProps = {
  player: Player
}

function formatRate(value: number): string {
  const fixed = value.toFixed(3)
  return value < 1 ? fixed.slice(1) : fixed
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBlock}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="smallBold">{value}</ThemedText>
    </View>
  )
}

function BatterStats({ batter }: { batter: Batter }) {
  const { stats } = batter
  if (!stats) {
    return (
      <ThemedText type="small" themeColor="textSecondary">
        No stats available
      </ThemedText>
    )
  }
  return (
    <>
      <StatBlock label="AVG" value={formatRate(stats.avg)} />
      <StatBlock label="HR" value={String(stats.homeRuns)} />
      <StatBlock label="RBI" value={String(stats.rbi)} />
      <StatBlock label="OPS" value={formatRate(stats.ops)} />
    </>
  )
}

function PitcherStats({ pitcher }: { pitcher: Pitcher }) {
  const { stats } = pitcher
  if (!stats) {
    return (
      <ThemedText type="small" themeColor="textSecondary">
        No stats available
      </ThemedText>
    )
  }
  return (
    <>
      <StatBlock label="ERA" value={stats.era.toFixed(2)} />
      <StatBlock label="W-L" value={`${stats.wins}-${stats.losses}`} />
      <StatBlock label="WHIP" value={stats.whip.toFixed(2)} />
      <StatBlock label="K" value={String(stats.strikeouts)} />
    </>
  )
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.header}>
        <ThemedText type="smallBold" themeColor="textSecondary">
          #{player.number}
        </ThemedText>
        <View style={styles.identity}>
          <ThemedText type="default">{player.name}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {player.position}
          </ThemedText>
        </View>
      </View>
      <View style={styles.statsRow}>
        {player.role === 'batter' ? (
          <BatterStats batter={player} />
        ) : (
          <PitcherStats pitcher={player} />
        )}
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  identity: {
    flex: 1,
    gap: Spacing.half,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBlock: {
    alignItems: 'center',
    gap: Spacing.half,
  },
})
