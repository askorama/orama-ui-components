import { Component, Host, Prop, Watch, h, Listen } from '@stencil/core'
import { OramaClient } from '@oramacloud/client'
import { searchState } from '@/context/searchContext'
import { chatContext } from '@/context/chatContext'
import { globalContext } from '@/context/GlobalContext'
import { ChatService } from '@/services/ChatService'
import { SearchService } from '@/services/SearchService'
import type { ResultMap } from '@/types'

@Component({
  tag: 'search-box',
  styleUrl: 'search-box.scss',
  shadow: true,
})
export class SearchBox {
  @Prop() themeConfig: { colors: { light: { primaryColor: string }; dark: { primaryColor: string } } }
  @Prop() color: 'dark' | 'light' | 'system'
  @Prop() facetProperty: string
  @Prop() open = false
  // TODO: Remove default values as soon as we have StoryBook fully working
  @Prop() resultMap: Partial<ResultMap> = { description: 'title', section: 'category' }

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    globalContext.open = newValue
  }

  @Watch('facetProperty')
  handleFacetPropertyChange(newValue: string) {
    searchState.facetProperty = newValue
  }

  @Listen('oramaItemClick')
  handleItemClick(event: CustomEvent) {
    // TODO: manage item click
    console.log('Item clicked', event.detail)
  }

  componentWillLoad() {
    globalContext.open = this.open

    // TODO: We probable want to keep these props below whithin the respective service
    // instance property. I seems to make sense to pass it as initialization prop.
    // Same goes for any other Chat init prop. Lets talk about it as well, please.

    searchState.facetProperty = this.facetProperty
    searchState.resultMap = this.resultMap

    const oramaClient = new OramaClient({
      api_key: 'yl2JSnjLNBV6FVfUWEyadpjFr6KzPiDR',
      endpoint: 'https://cloud.orama.run/v1/indexes/recipes-m7w9mm',
    })

    searchState.searchService = new SearchService(oramaClient)
    chatContext.chatService = new ChatService(oramaClient)
  }

  render() {
    return (
      <Host>
        <div class={{ 'orama-container': true, hidden: !globalContext.open }}>
          {/* NAVIGATION - to replace with component */}
          <div style={{ display: 'grid', padding: '8px', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div>
              <button type="button" onClick={() => (globalContext.open = false)}>
                Back Placeholder
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <orama-toggler />
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <div>PLACEHOLDER</div>
            </div>
          </div>
          {/* MAIN CONTENT */}
          <div class="main">
            <orama-search style={{ display: globalContext.selectedTab === 'search' ? 'flex' : 'none' }} />
            <orama-chat style={{ display: globalContext.selectedTab === 'chat' ? 'flex' : 'none' }} />
          </div>
          {/* FOOTER - to replace with component */}
          <div class="footer" style={{ textAlign: 'center' }}>
            <orama-text as="span">Orama logo</orama-text>
          </div>
        </div>
      </Host>
    )
  }
}
