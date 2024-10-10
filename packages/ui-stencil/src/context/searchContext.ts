import type { SearchService } from '@/services/SearchService'
import { createStore } from '@stencil/store'
import type { ResultMap, SearchResultBySection } from '@/types'
import type { AnyOrama, Orama, SearchParams } from '@orama/orama'
import type { OramaClient } from '@oramacloud/client'

const store = createStore({
  count: 0,
  // TODO: Create a type for facets
  facets: [] as { name: string; count: number }[],
  facetProperty: '', // TODO: consider to move to resultsMap
  results: [] as SearchResultBySection[],
  resultMap: {} as ResultMap,
  sourceBaseURL: '' as string,
  linksTarget: '_blank' as string,
  linksRel: 'noopener noreferrer' as string,
  highlightedIndex: -1,
  loading: false,
  error: false,
  // TODO: Probable needs to be held in component property.
  // Lets queckly dicudd about this again.
  searchService: null as SearchService | null,
  searchParams: null as SearchParams<Orama<AnyOrama | OramaClient>>,
})

const { state: searchState, ...searchStore } = store

export { searchState, searchStore }
