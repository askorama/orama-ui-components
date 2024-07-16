import { Component, Host, h, Element, Prop, Event, type EventEmitter } from '@stencil/core'
import type { SearchResult, SearchResultBySection } from '@/types'

export type SearchResultsProps = {
  sections: SearchResultBySection[]
  searchTerm?: string
}

@Component({
  tag: 'orama-search-results',
  styleUrl: 'orama-search-results.scss',
})
export class SearchResults {
  @Element() el: HTMLUListElement
  @Event() oramaItemClick: EventEmitter<SearchResult>
  @Prop() sections: SearchResultBySection[] = []
  @Prop() searchTerm: SearchResultsProps['searchTerm']

  handleItemClick = (item: SearchResult) => {
    if (item?.path) {
      this.oramaItemClick.emit(item)
      window.location.href = item.path
    } else {
      console.error('No path found')
    }
  }

  render() {
    if (!this.sections?.some((section) => section.items.length > 0)) {
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
        <ul class="list">
          {this.sections.map((section) => (
            <div key={section.section}>
              {section.section && (
                <div class="section-title-wrapper">
                  <orama-text as="h2" styledAs="span">
                    {section.section}
                  </orama-text>
                </div>
              )}
              <ul class="list">
                {section.items.map((result) => (
                  <li class="list-item" key={result.id}>
                    <button type="button" class="list-item-button" onClick={() => this.handleItemClick(result)}>
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
