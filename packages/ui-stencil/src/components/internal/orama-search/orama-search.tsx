import { Component, Host, State, Watch, h } from '@stencil/core'
import { searchState } from '@/context/searchContext'

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

  onInputChange = (e: Event) => {
    this.searchValue = (e.target as HTMLInputElement).value
    searchState.term = this.searchValue
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
        <div class="result-wrapper">
          <orama-facets
            facets={searchState.facets}
            selectedFacet={this.selectedFacet}
            onFacetClick={this.onFacetClickHandler}
          />
          <orama-search-results sections={searchState.results} />
        </div>
      </Host>
    )
  }
}
