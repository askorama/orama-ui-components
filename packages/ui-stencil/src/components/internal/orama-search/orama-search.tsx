import { Component, Host, State, Watch, h } from '@stencil/core'
import { searchState, searchStore } from '@/context/searchContext'
import type { SearchResultsProps } from '@/components/internal/orama-search-results/orama-search-results'

@Component({
  tag: 'orama-search',
  styleUrl: 'orama-search.scss',
})
export class OramaSearch {
  @State() searchValue = ''
  @State() searchResults: SearchResultsProps['items'] = []
  @State() facets = []

  @Watch('searchValue')
  handleSearchValueChange(newValue: string) {
    searchState.searchService.search(newValue)

    // TODO: should be moved to service
    searchStore.onChange('hits', (hits) => {
      this.searchResults = hits.map((hit) => ({
        id: hit.document.id,
        title: hit.document.title,
        description: hit.document.content,
        path: hit.document.path,
      }))
    })

    // TODO: category should be dynamic and taken from resultsMap
    searchStore.onChange('facets', (facets) => {
      if (!searchState.facetProperty && !facets[searchState.facetProperty]?.values) {
        return
      }
      const totalCount = Object.values(facets[searchState.facetProperty]?.values).reduce((acc, count) => acc + count, 0)
      const allFacets = Object.keys(facets[searchState.facetProperty]?.values).map((key) => {
        return {
          name: key,
          count: facets.category.values[key],
        }
      })
      this.facets = [
        {
          name: 'All',
          count: totalCount,
        },
        ...allFacets,
      ]
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
          size="large"
          labelForScreenReaders="Search..."
          placeholder="Search..."
        />
        <orama-facets facets={this.facets} />
        <orama-search-results items={this.searchResults} />
      </Host>
    )
  }
}
