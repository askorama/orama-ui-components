import type { SearchService } from '@/services/SearchService'
import { createStore } from '@stencil/store'

const store = createStore({
  open: false,
  count: 0,
  facets: null as Record<
    string,
    {
      count: number
      values: Record<string, number>
    }
  > | null,
  facetProperty: '', // TODO: consider to move to resultsMap
  currentFacet: {
    name: undefined as string | undefined,
    count: 0,
  },
  hits: [],
  term: '',
  highlightedIndex: -1,
  searchService: null as SearchService | null,
})

const { state: searchState, ...searchStore } = store

searchStore.onChange('currentFacet', (currentFacet) => {
  searchState.searchService?.search(searchState.term, currentFacet?.name)
})

export { searchState, searchStore }
