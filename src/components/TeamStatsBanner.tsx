import { StyleSheet, View } from 'react-native'

import { Spacing } from '@/constants/theme'
import { TeamStats } from '@/types/team.types'

import { ThemedText } from './themed-text'
import { ThemedView } from './themed-view'

type TeamStatsBannerProps = {
  stats: TeamStats
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

function RecordColumn({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.recordColumn}>
      <ThemedText type="subtitle">{value}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  )
}

export function TeamStatsBanner({ stats }: TeamStatsBannerProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.banner}>
      <View style={styles.record}>
        {stats.record ? (
          <>
            <RecordColumn value={stats.record.wins} label="W" />
            <ThemedText type="subtitle" themeColor="textSecondary">
              -
            </ThemedText>
            <RecordColumn value={stats.record.losses} label="L" />
          </>
        ) : (
          <ThemedText type="small" themeColor="textSecondary">
            Record unavailable
          </ThemedText>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <StatBlock label="WIN%" value={stats.record ? formatRate(stats.record.winPercentage) : '--'} />
        <StatBlock label="AVG" value={stats.batting ? formatRate(stats.batting.avg) : '--'} />
        <StatBlock label="OPS" value={stats.batting ? formatRate(stats.batting.ops) : '--'} />
        <StatBlock label="ERA" value={stats.pitching ? stats.pitching.era.toFixed(2) : '--'} />
        <StatBlock label="HR" value={stats.batting ? String(stats.batting.homeRuns) : '--'} />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  record: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  recordColumn: {
    alignItems: 'center',
    gap: Spacing.half,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
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
