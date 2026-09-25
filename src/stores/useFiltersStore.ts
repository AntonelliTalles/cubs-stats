import { create } from 'zustand'

interface Filters {
  search: string
}

interface FiltersStore extends Filters {
  setSearch: (search: string) => void
}

const initialFilters: Filters = {
  search: '',
}

export const useFiltersStore = create<FiltersStore>((set) => ({
  ...initialFilters,
  setSearch: (search) => set({ search }),
}))
