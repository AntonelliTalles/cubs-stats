import { useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  LayoutChangeEvent,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { PlayerCard } from '@/components/PlayerCard'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Spacing } from '@/constants/theme'
import { useTheme } from '@/hooks/use-theme'
import { usePlayers } from '@/hooks/usePlayers'
import { useFiltersStore } from '@/stores/useFiltersStore'
import { Player } from '@/types/player.types'

type FilterPosition = 'ALL' | 'C' | '1B' | '2B' | '3B' | 'SS' | 'OF' | 'P'

const POSITION_FILTERS: FilterPosition[] = [
  'ALL',
  'C',
  '1B',
  '2B',
  '3B',
  'SS',
  'OF',
  'P',
]

function matchesPosition(player: Player, filter: FilterPosition): boolean {
  if (filter === 'ALL') return true
  if (filter === 'OF') {
    return player.position === 'LF' || player.position === 'CF' || player.position === 'RF'
  }
  if (filter === 'P') {
    return player.role === 'pitcher'
  }
  return player.position === filter
}

type PositionChipProps = {
  label: string
  active: boolean
  onPress: () => void
}

function PositionChip({ label, active, onPress }: PositionChipProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView
        type={active ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.chip}
      >
        <ThemedText type="smallBold" style={styles.chipLabel}>
          {label}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  )
}

const renderPlayer: ListRenderItem<Player> = ({ item }) => <PlayerCard player={item} />

const keyExtractor = (player: Player) => String(player.id)

export default function PlayersScreen() {
  const theme = useTheme()
  const { data: players, isLoading, isError } = usePlayers()
  const { search, setSearch } = useFiltersStore()
  const [positionFilter, setPositionFilter] = useState<FilterPosition>('ALL')

  const filteredPlayers = useMemo(() => {
    if (!players) return []
    return players.filter(
      (player) =>
        matchesPosition(player, positionFilter) &&
        player.name.toLowerCase().includes(search.toLowerCase()),
    )
  }, [players, positionFilter, search])

  // TEMP DEBUG — remover após diagnóstico
  const logLayout = (label: string) => (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout
    console.log(`[DEBUG] ${label} onLayout`, { x, y, width, height })
  }

  return (
    <ThemedView style={styles.container} onLayout={logLayout('SCREEN_ROOT')}>
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'left', 'right']}
        onLayout={logLayout('SAFE_AREA')}
      >
        {/* TEMP DEBUG — agrupamento só para medir a área de header/filtros como um bloco */}
        <View style={styles.headerFilterArea} onLayout={logLayout('HEADER_FILTER_AREA')}>
          <ThemedText type="subtitle">Chicago Cubs Players</ThemedText>

          <TextInput
            style={[
              styles.searchInput,
              { color: theme.text, backgroundColor: theme.backgroundElement },
            ]}
            placeholder="Search players..."
            placeholderTextColor={theme.textSecondary}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
            autoCapitalize="words"
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {POSITION_FILTERS.map((pos) => (
              <PositionChip
                key={pos}
                label={pos}
                active={positionFilter === pos}
                onPress={() => setPositionFilter(pos)}
              />
            ))}
          </ScrollView>
        </View>

        {isLoading && (
          <View style={styles.centered}>
            <ActivityIndicator color={theme.text} size="large" />
          </View>
        )}

        {isError && (
          <View style={styles.centered}>
            <ThemedText type="default" themeColor="textSecondary">
              Failed to load players. Please try again.
            </ThemedText>
          </View>
        )}

        {!isLoading && !isError && (
          <FlatList
            style={styles.playerList}
            onLayout={logLayout('FLATLIST')}
            data={filteredPlayers}
            keyExtractor={keyExtractor}
            renderItem={renderPlayer}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <ThemedText type="default" themeColor="textSecondary">
                  No players found.
                </ThemedText>
              </View>
            }
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          />
        )}
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
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.two,
    gap: Spacing.three,
  },
  // TEMP DEBUG — reproduz o gap que title/search/filtros tinham como filhos diretos de safeArea
  headerFilterArea: {
    gap: Spacing.three,
  },
  searchInput: {
    height: 44,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },
  filterRow: {
    gap: Spacing.two,
    paddingVertical: Spacing.half,
  },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLabel: {
    lineHeight: undefined,
  },
  playerList: {
    flex: 1,
  },
  list: {
    paddingBottom: Spacing.five,
  },
  separator: {
    height: Spacing.two,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.five,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.five,
  },
})
