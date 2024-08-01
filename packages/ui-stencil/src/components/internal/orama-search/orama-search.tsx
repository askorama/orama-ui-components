import { Component, Host, Listen, State, Watch, h, Element } from '@stencil/core'
import { searchState } from '@/context/searchContext'
import type { SearchResult } from '@/types'

@Component({
  tag: 'orama-search',
  styleUrl: 'orama-search.scss',
})
export class OramaSearch {
  @Element() el: HTMLElement
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

  handleSubmit = (e: Event) => {
    e.preventDefault()
    // trigger click on chat button
    const chatButton = this.el.querySelector('orama-chat-button') as HTMLElement
    chatButton.click()
  }

  render() {
    return (
      <Host>
        <form onSubmit={this.handleSubmit} class="search-form">
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
        </form>
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
