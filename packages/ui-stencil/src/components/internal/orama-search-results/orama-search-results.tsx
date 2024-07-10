import { Component, Host, h, Element, Prop } from '@stencil/core'

export type SearchResultsProps = {
  items: { id: string; title: string; description: string; path?: string }[]
  searchTerm?: string
}

@Component({
  tag: 'orama-search-results',
  styleUrl: 'orama-search-results.scss',
})
export class SearchResults {
  @Element() el: HTMLUListElement

  @Prop() items: SearchResultsProps['items'] = []
  @Prop() searchTerm: SearchResultsProps['searchTerm']

  render() {
    if (!this.items.length) {
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
              <div>
                <orama-text as="h3" styledAs="p">
                  {item.title}
                </orama-text>
                <orama-text as="p" styledAs="span" class="collapsed">
                  {item.description}
                </orama-text>
              </div>
            </li>
          ))}
        </ul>
      </Host>
    )
  }
}
