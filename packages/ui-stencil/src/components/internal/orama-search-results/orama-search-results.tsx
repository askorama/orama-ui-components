import { Component, Host, h, Element, Prop, Event, type EventEmitter } from '@stencil/core'
import type { SearchResult, SearchResultBySection } from '@/types'
import '@phosphor-icons/webcomponents/dist/icons/PhFiles.mjs'

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
  @Prop() sections: SearchResultBySection[] = []
  @Prop() searchTerm: SearchResultsProps['searchTerm']
  @Prop() loading = false
  @Prop() error = false

  handleItemClick = (item: SearchResult) => {
    if (item?.path) {
      this.oramaItemClick.emit(item)
      window.location.href = item.path
    } else {
      throw new Error('No path found')
    }
  }

  render() {
    if (!this.searchTerm) {
      return null
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
            <div key={section.section}>
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
                        <orama-text as="p" styledAs="span" class="collapsed">
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
