import { Component, Host, Listen, State, Watch, h, Element, Prop } from '@stencil/core'
import { searchState } from '@/context/searchContext'
import type { SearchResult } from '@/types'
import { globalContext } from '@/context/GlobalContext'
import { chatContext } from '@/context/chatContext'

@Component({
  tag: 'orama-search',
  styleUrl: 'orama-search.scss',
  scoped: true,
})
export class OramaSearch {
  @Element() el: HTMLElement

  @Prop() placeholder?: string = 'Search...'
  @Prop() focusInput?: boolean = false
  @Prop() suggestions?: string[] = []
  @Prop() sourceBaseUrl?: string
  @Prop() linksTarget?: string
  @Prop() linksRel?: string
  @Prop() disableChat?: boolean = false

  @State() searchValue = ''
  @State() selectedFacet = ''

  inputRef!: HTMLOramaInputElement

  @Watch('searchValue')
  @Watch('selectedFacet')
  handleSearchValueChange() {
    searchState.searchService.search(this.searchValue, this.selectedFacet)
    globalContext.currentTerm = this.searchValue
  }

  @Listen('oramaItemClick')
  handleOramaItemClick(event: CustomEvent<SearchResult>) {
    console.log(`Item clicked: ${event.detail.title}`, event.detail)
  }

  onFacetClickHandler = (facetName: string) => {
    this.selectedFacet = facetName
  }

  onInputChange = (e: Event) => {
    this.searchValue = (e.target as HTMLInputElement).value
  }

  handleSubmit = (e: Event) => {
    e.preventDefault()

    if (this.disableChat) {
      return
    }

    const chatButton = this.el.querySelector('orama-chat-button') as HTMLElement
    chatButton.click()
  }

  render() {
    return (
      <Host>
        <form onSubmit={this.handleSubmit} class="search-form">
          <orama-input
            focus-on-arrow-nav
            autoFocus={this.focusInput}
            type="search"
            onInput={this.onInputChange}
            size="large"
            labelForScreenReaders={this.placeholder}
            placeholder={this.placeholder}
            onResetValue={() => {
              this.searchValue = ''
            }}
          />
          <slot name="summary" />
        </form>
        <div class="result-wrapper">
          <orama-facets
            facets={searchState.facets}
            selectedFacet={this.selectedFacet}
            facetClicked={this.onFacetClickHandler}
          />
          <orama-search-results
            suggestions={!globalContext.currentTerm?.length && !this.disableChat ? this.suggestions : []}
            setChatTerm={(term) => {
              globalContext.currentTask = 'chat'
              chatContext.chatService?.sendQuestion(term)
            }}
            sourceBaseUrl={this.sourceBaseUrl}
            linksTarget={this.linksTarget}
            linksRel={this.linksRel}
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
