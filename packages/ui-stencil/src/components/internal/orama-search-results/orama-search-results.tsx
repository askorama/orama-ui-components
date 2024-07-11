import { Component, Host, h, Element, Prop, Event } from '@stencil/core'
import type { EventEmitter } from '@stencil/core'

export type SearchItem = {
  id: string
  title: string
  description: string
  path?: string
}

export type SearchResultsProps = {
  items: SearchItem[] | null
  searchTerm?: string
}

@Component({
  tag: 'orama-search-results',
  styleUrl: 'orama-search-results.scss',
})
export class SearchResults {
  @Element() el: HTMLUListElement

  @Event() oramaItemClick: EventEmitter<SearchItem>

  @Prop() items: SearchResultsProps['items']
  @Prop() searchTerm: SearchResultsProps['searchTerm']

  handleItemClick = (item: SearchItem) => {
    if (item?.path) {
      this.oramaItemClick.emit(item)
      window.location.href = item.path
    } else {
      console.error('No path found')
    }
  }

  render() {
    console.log('this.items', this.items)
    if (!this.items?.length) {
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
          {this.items.map((item) => (
            <li class="list-item" key={item.id}>
              <button type="button" class="list-item-button" onClick={() => this.handleItemClick(item)}>
                <div>
                  <orama-text as="h3" styledAs="p">
                    {item.title}
                  </orama-text>
                  <orama-text as="p" styledAs="span" class="collapsed">
                    {item.description}
                  </orama-text>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </Host>
    )
  }
}
