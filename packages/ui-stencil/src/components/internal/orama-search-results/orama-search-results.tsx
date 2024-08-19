import { Component, Host, h, Element, Prop, Event, type EventEmitter } from '@stencil/core'
import type { SearchResult, SearchResultBySection } from '@/types'
import '@phosphor-icons/webcomponents/dist/icons/PhFiles.mjs'
import { Icon } from '@/components/internal/icons'

export type SearchResultsProps = {
  sections: SearchResultBySection[]
  searchTerm?: string
}

@Component({
  tag: 'orama-search-results',
  styleUrl: 'orama-search-results.scss',
  scoped: true,
})
export class SearchResults {
  @Element() el: HTMLUListElement
  @Event() oramaItemClick: EventEmitter<SearchResult>
  @Prop() sourceBaseUrl?: string
  @Prop() sections: SearchResultBySection[] = []
  @Prop() suggestions?: string[] = []
  @Prop() searchTerm: SearchResultsProps['searchTerm']
  @Prop() setChatTerm: (term: string) => void
  @Prop() loading = false
  @Prop() error = false

  handleItemClick = (item: SearchResult) => {
    if (item?.path) {
      this.oramaItemClick.emit(item)
      window.location.href = this.sourceBaseUrl ? `${this.sourceBaseUrl}${item.path}` : item.path
    } else {
      throw new Error('No path found')
    }
  }

  render() {
    if (!this.searchTerm) {
      return (
        <div class="suggestions-wrapper">
          {!!this.suggestions?.length && (
            <orama-text as="h2" styledAs="small" class="suggestions-title" variant="secondary">
              Suggestions
            </orama-text>
          )}
          <orama-chat-suggestions
            as="list"
            icon={<Icon name="starFour" size={16} />}
            suggestions={this.suggestions}
            suggestionClicked={(term) => {
              this.setChatTerm(term)
            }}
          />
        </div>
      )
    }

    if (this.error) {
      // TODO: Implement
      return <div>An error occurred while trying to search. Please try again.</div>
    }

    if (!this.loading && !this.sections?.some((section) => section.items.length > 0)) {
      return (
        <div class="results-empty">
          <orama-text as="h3" styledAs="span">
            {`No results found ${this.searchTerm ? `for "${this.searchTerm}"` : ''}`}
          </orama-text>
        </div>
      )
    }

    return (
      <Host>
        <ul class="list section-list">
          {this.sections.map((section) => (
            <div key={section.section} class="section-wrapper">
              {section.section && (
                <div class="section-title-wrapper">
                  <orama-text as="h2" styledAs="span">
                    {section.section}
                  </orama-text>
                </div>
              )}
              <ul class="list section-item-list">
                {section.items.map((result) => (
                  <li class="list-item" key={result.id}>
                    <button type="button" class="list-item-button" onClick={() => this.handleItemClick(result)}>
                      <ph-files size="20px" />
                      <div>
                        <orama-text as="h3" styledAs="p">
                          {result.title}
                        </orama-text>
                        <orama-text as="p" styledAs="span" class="collapsed" variant="tertiary">
                          {result.description}
                        </orama-text>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      </Host>
    )
  }
}
