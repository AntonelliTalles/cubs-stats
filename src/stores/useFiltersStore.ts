import { create } from 'zustand'

import { Position } from '@/types/player.types'

interface Filters {
  season: number
  position: Position | null
  search: string
}

interface FiltersStore extends Filters {
  setSeason: (season: number) => void
  setPosition: (position: Position | null) => void
  setSearch: (search: string) => void
  clearFilters: () => void
}

const DEFAULT_SEASON = 2025

const initialFilters: Filters = {
  season: DEFAULT_SEASON,
  position: null,
  search: '',
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  ...initialFilters,
  setSeason: (season) => set({ season }),
  setPosition: (position) => set({ position }),
  setSearch: (search) => set({ search }),
  clearFilters: () => set(initialFilters),
}))
