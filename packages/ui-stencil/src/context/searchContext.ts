import type { SearchService } from '@/services/SearchService'
import { createStore } from '@stencil/store'
import type { ResultMap, SearchResultBySection } from '@/types'

const store = createStore({
  count: 0,
  // TODO: Create a type for facets
  facets: [] as { name: string; count: number }[],
  facetProperty: '', // TODO: consider to move to resultsMap
  results: [] as SearchResultBySection[],
  resultMap: {} as ResultMap,
  highlightedIndex: -1,
  loading: false,
  error: false,
  // TODO: Probable needs to be held in component property.
  // Lets queckly dicudd about this again.
  searchService: null as SearchService | null,
})

const { state: searchState, ...searchStore } = store

export { searchState, searchStore }
