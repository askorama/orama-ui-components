import { Component, Host, h, Element, Prop, Event, type EventEmitter } from '@stencil/core'
import type { SearchResult, SearchResultBySection } from '@/types'
import { Highlight } from '@orama/highlight'
import type { HighlightOptions } from '@orama/highlight'
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
  @Prop() linksTarget?: string = '_blank'
  @Prop() linksRel?: string = 'noopener noreferrer'
  @Prop() sections: SearchResultBySection[] = []
  @Prop() suggestions?: string[] = []
  @Prop() searchTerm: SearchResultsProps['searchTerm']
  @Prop() setChatTerm: (term: string) => void
  @Prop() loading = false
  @Prop() error = false
  @Prop() highlight?: HighlightOptions | false = false

  private highlighter?: Highlight

  handleItemClick = (item: SearchResult) => {
    if (item?.path) {
      this.oramaItemClick.emit(item)
    } else {
      throw new Error('No path found')
    }
  }

  getItemLinkUrl = (item: SearchResult) => {
    if (item?.path) {
      return this.sourceBaseUrl ? `${this.sourceBaseUrl}${item.path}` : item.path
    }
    return '#'
  }

  getHighlightedText = (text: string) => {
    return this.highlighter.highlight(text, this.searchTerm)
  }

  componentDidLoad() {
    if (this.highlight) {
      this.highlighter = new Highlight(this.highlight)
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
            icon={<Icon name="starFour" size={16} color="var(--text-color-accent, text-color('accent')" />}
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
                    <a
                      focus-on-arrow-nav
                      href={`${this.sourceBaseUrl}${result.path}`}
                      class="list-item-button"
                      target={this.linksTarget}
                      rel={this.linksRel}
                      id={`search-result-${result.id}`}
                      onClick={() => this.handleItemClick(result)}
                    >
                      <ph-files size="20px" />
                      <div>
                        <orama-text as="h3" styledAs="p" class="result-title collapsed">
                          {!this.highlight ? (
                            <span innerHTML={result.title} />
                          ) : result.title.length > 60 ? (
                            <span innerHTML={this.getHighlightedText(result.title).trim(60)} />
                          ) : (
                            <span innerHTML={this.getHighlightedText(result.title).HTML} />
                          )}
                        </orama-text>
                        <orama-text as="p" styledAs="span" class="result-description collapsed" variant="tertiary">
                          {!this.highlight ? (
                            <span innerHTML={result.description} />
                          ) : (
                            <span innerHTML={this.getHighlightedText(result.description).trim(60)} />
                          )}
                        </orama-text>
                      </div>
                    </a>
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
