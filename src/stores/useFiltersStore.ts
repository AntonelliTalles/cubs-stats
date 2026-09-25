import { create } from 'zustand'

interface Filters {
  position: string | null
  search: string
}

interface FiltersStore extends Filters {
  setPosition: (position: string | null) => void
  setSearch: (search: string) => void
  clearFilters: () => void
}

const initialFilters: Filters = {
  position: null,
  search: '',
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  ...initialFilters,
  setPosition: (position) => set({ position }),
  setSearch: (search) => set({ search }),
  clearFilters: () => set(initialFilters),
}))
