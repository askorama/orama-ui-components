import { OramaClient } from '@oramacloud/client'
import { Component, Host, State, Watch, h } from '@stencil/core'
import { SearchService } from '@/services/SearchService'
import { searchState, searchStore } from '@/context/searchContext'
import type { SearchResultsProps } from '@/components/internal/orama-search-results/orama-search-results'

@Component({
  tag: 'orama-search',
  styleUrl: 'orama-search.scss',
})
export class OramaSearch {
  private searchService!: SearchService

  @State() searchValue = ''
  @State() searchResults: SearchResultsProps['items'] = []

  // TODO: We probably want to use this oramaClient both in chat and search. We may want to uplift orama client to be a singleton
  componentWillLoad() {
    // TODO: Should not be hardcoded
    const oramaClient = new OramaClient({
      api_key: '6kHcoevr3zkbBmC2hHqlcNQrOgejS4ds',
      endpoint: 'https://cloud.orama.run/v1/indexes/orama-docs-pgjign',
    })

    this.searchService = new SearchService(oramaClient)
  }

  @Watch('searchValue')
  handleSearchValueChange(newValue: string) {
    this.searchService.search(newValue)
    searchStore.onChange('hits', (hits) => {
      this.searchResults = hits.map((hit) => ({
        id: hit.document.id,
        title: hit.document.title,
        description: hit.document.content,
        path: hit.document.path,
      }))
    })
  }

  onSearch(e: Event) {
    this.searchValue = (e.target as HTMLInputElement).value
    searchState.term = this.searchValue
  }

  render() {
    return (
      <Host>
        <orama-input
          autofocus
          type="search"
          onInput={this.onSearch.bind(this)}
          labelForScreenReaders="Search..."
          placeholder="Search..."
        />
        <orama-search-results items={this.searchResults} />
      </Host>
    )
  }
}
