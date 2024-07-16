import { Component, Host, Prop, Watch, h, Listen, Element, State } from '@stencil/core'
import { OramaClient } from '@oramacloud/client'
import { searchState } from '@/context/searchContext'
import { chatContext } from '@/context/chatContext'
import { globalContext } from '@/context/GlobalContext'
import { ChatService } from '@/services/ChatService'
import { SearchService } from '@/services/SearchService'
import type { TThemeOverrides } from '@/config/theme'
import type { ResultMap } from '@/types'

@Component({
  tag: 'search-box',
  styleUrl: 'search-box.scss',
  shadow: true,
})
export class SearchBox {
  @Element() el: HTMLElement

  @Prop() themeConfig: Partial<TThemeOverrides>
  @Prop() colorScheme: 'dark' | 'light' | 'system' = 'light'
  @Prop() facetProperty?: string
  @Prop() open? = false
  @Prop() resultMap?: Partial<ResultMap> = {}

  @State() systemScheme: 'light' | 'dark' = 'light'

  @Watch('themeConfig')
  @Watch('colorScheme')
  watchHandler() {
    this.updateTheme()
  }

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

  updateTheme() {
    const scheme = this.colorScheme === 'system' ? this.systemScheme : this.colorScheme
    const uiElement = document.querySelector('#orama-ui')

    if (uiElement && scheme) {
      uiElement.classList.remove('theme-light', 'theme-dark')
      uiElement.classList.add(`theme-${scheme}`)
    }

    this.updateCssVariables(scheme)
  }

  updateCssVariables(scheme: 'light' | 'dark') {
    const config = this.themeConfig
    const root = document.querySelector('#orama-ui') as HTMLElement

    if (root && config && scheme) {
      if (config.colors?.[scheme]) {
        for (const key of Object.keys(config.colors[scheme])) {
          root.style.setProperty(`${key}`, config.colors[scheme][key])
        }
      }
      if (config.typography) {
        for (const key of Object.keys(config.typography)) {
          root.style.setProperty(`${key}`, config.typography[key])
        }
      }
    }
  }

  detectSystemColorScheme() {
    const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    this.systemScheme = darkSchemeQuery.matches ? 'dark' : 'light'

    darkSchemeQuery.addEventListener('change', (event) => {
      this.systemScheme = event.matches ? 'dark' : 'light'
      if (this.colorScheme === 'system') {
        this.updateTheme()
      }
    })
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

    this.updateTheme()
    this.detectSystemColorScheme()
  }

  render() {
    return (
      <Host>
        <div class={{ 'orama-container': true, hidden: !globalContext.open }}>
          {/* NAVIGATION - to replace with component */}
          <div style={{ display: 'flex', padding: '8px' }}>
            <div style={{ flex: '1' }}>
              <button type="button" onClick={() => (globalContext.open = false)}>
                Back
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexGrow: '1' }}>
              <orama-toggler />
            </div>
            <div style={{ display: 'flex', flex: '1', justifyContent: 'end' }}>
              <div>...</div>
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
