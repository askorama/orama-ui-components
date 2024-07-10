import type { OramaClient } from '@oramacloud/client'
import { OramaClientNotInitializedError } from '../erros/OramaClientNotInitialized'
import { searchState } from '../context/searchContext'

const LIMIT_RESULTS = 10

export class SearchService {
  private abortController: AbortController
  private oramaClient: OramaClient

  constructor(oramaClient: OramaClient) {
    this.oramaClient = oramaClient
    this.abortController = new AbortController()
  }

  search = (term: string) => {
    if (!this.oramaClient) {
      throw new OramaClientNotInitializedError()
    }

    if (!term) {
      return
    }

    this.abortSearch()

    // TODO: Maybe we would like to have a debounce here (Check with Michele)
    this.oramaClient
      .search({ term: term, limit: LIMIT_RESULTS }, { abortController: this.abortController })
      .then((results) => {
        searchState.hits = (results?.hits as []) || []
        searchState.count = results?.count || 0
        searchState.facets = results?.facets || null
        searchState.highlightedIndex = -1
      })
  }

  abortSearch(): void {
    this.abortController.abort()
    this.abortController = new AbortController()
  }

  // TODO
  retry = () => {
    throw new Error('Not implemented')
  }
}
