import { OramaClient } from '@oramacloud/client'
import { Component, Host, State, Watch, h } from '@stencil/core'
import { SearchService } from '../../../services/SearchService'
import { searchContext } from '../../../context/searchContext'

@Component({
  tag: 'orama-search',
  styleUrl: 'orama-search.scss',
  shadow: true
})
export class OramaSearch {
  private searchService!: SearchService

  @State() inputValue = ''

  // TODO: We probably want to use this oramaClient both in chat and search. We may want to uplift orama client to be a singleton
  componentWillLoad() {
    // TODO: Should not be hardcoded
    const oramaClient = new OramaClient({
      api_key: '6kHcoevr3zkbBmC2hHqlcNQrOgejS4ds',
      endpoint: 'https://cloud.orama.run/v1/indexes/orama-docs-pgjign'
    })

    this.searchService = new SearchService(oramaClient)
  }

  @Watch('inputValue')
  handleInputValueChange(newValue: string) {
    this.searchService.search(newValue)
    console.log(searchContext.hits)
  }

  render() {
    return (
      <Host style={{ background: 'black', color: 'white' }}>
        <div
          style={{
            height: '400px',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: '1'
          }}
        >
          <h3>Search Placeholder</h3>
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', gap: '10px' }}>
            {searchContext.hits.map((hit) => (
              <div key={hit.id}>
                <div>{hit.document.title}</div>
                <div style={{ whiteSpace: 'nowrap' }}>{hit.document.content}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <orama-input
            // TODO: Autofocus is not working
            // TODO: Width style is not working
            autoFocus
            style={{ width: '100%' }}
            onInput={(e: Event) => (this.inputValue = (e.target as HTMLInputElement).value)}
          />
        </div>
      </Host>
    )
  }
}
