import { Component, Host, Listen, State, Watch, h } from '@stencil/core'
import { searchState } from '@/context/searchContext'
import type { SearchResult } from '@/types'

@Component({
  tag: 'orama-search',
  styleUrl: 'orama-search.scss',
})
export class OramaSearch {
  @State() searchValue = ''
  @State() selectedFacet = ''

  @Watch('searchValue')
  @Watch('selectedFacet')
  handleSearchValueChange() {
    searchState.searchService.search(this.searchValue, this.selectedFacet)
  }

  onFacetClickHandler = (facetName: string) => {
    this.selectedFacet = facetName
  }

  @Listen('oramaItemClick')
  handleOramaItemClick(event: CustomEvent<SearchResult>) {
    alert(`${event.detail.title} clicked`)
  }

  onInputChange = (e: Event) => {
    this.searchValue = (e.target as HTMLInputElement).value
  }

  render() {
    return (
      <Host>
        <orama-input
          autofocus
          type="search"
          onInput={this.onInputChange}
          size="large"
          labelForScreenReaders="Search..."
          placeholder="Search..."
        />
        <orama-chat-button
          active={!!this.searchValue}
          label={`${this.searchValue ? `${this.searchValue} - ` : ''}Get a summary`}
          class="chat-button"
          onClick={() => alert('Chat clicked')}
          onKeyPress={() => alert('Chat key pressed')}
        />
        <div class="result-wrapper">
          <orama-facets
            facets={searchState.facets}
            selectedFacet={this.selectedFacet}
            facetClicked={this.onFacetClickHandler}
          />
          <orama-search-results
            sections={searchState.results}
            searchTerm={this.searchValue}
            loading={searchState.loading}
            error={searchState.error}
          />
        </div>
      </Host>
    )
  }
}
