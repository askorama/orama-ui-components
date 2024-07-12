import { Component, Host, Prop, Watch, h, Listen } from '@stencil/core'
import { OramaClient } from '@oramacloud/client'
import { searchState } from '@/context/searchContext'
import { chatContext } from '@/context/chatContext'
import { globalContext } from '@/context/searchBoxContext'
import { ChatService } from '@/services/ChatService'
import { SearchService } from '@/services/SearchService'

@Component({
  tag: 'search-box',
  styleUrl: 'search-box.scss',
  shadow: true,
})
export class SearchBox {
  @Prop() themeConfig: { colors: { light: { primaryColor: string }; dark: { primaryColor: string } } }
  @Prop() color: 'dark' | 'light' | 'system'
  @Prop() facetProperty: string
  @Prop() open: false

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    searchState.open = newValue
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
    searchState.open = this.open
    searchState.facetProperty = this.facetProperty

    const oramaClient = new OramaClient({
      api_key: '6kHcoevr3zkbBmC2hHqlcNQrOgejS4ds',
      endpoint: 'https://cloud.orama.run/v1/indexes/orama-docs-pgjign',
    })

    searchState.searchService = new SearchService(oramaClient)
    chatContext.chatService = new ChatService(oramaClient)
  }

  render() {
    if (!searchState.open) {
      return null
    }

    return (
      <Host>
        {/* NAVIGATION - to replace with component */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
          <orama-toggler />
        </div>
        {/* MAIN CONTENT */}
        <div class="main">
          <orama-search style={{ display: globalContext.selectedTab === 'search' ? 'block' : 'none' }} />
          <orama-chat style={{ display: globalContext.selectedTab === 'chat' ? 'flex' : 'none' }} />
        </div>
        {/* FOOTER - to replace with component */}
        <div class="footer" style={{ textAlign: 'center' }}>
          <orama-text as="span">Orama logo</orama-text>
        </div>
      </Host>
    )
  }
}
