import { create } from 'zustand'

interface Filters {
  season: number
  position: string | null
  search: string
}

interface FiltersStore extends Filters {
  setSeason: (season: number) => void
  setPosition: (position: string | null) => void
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
