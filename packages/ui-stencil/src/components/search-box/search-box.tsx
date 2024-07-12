import { Component, Host, Prop, Watch, h, Listen } from '@stencil/core'
import { searchState } from '@/context/searchContext'
import { globalContext } from '@/context/searchBoxContext'

@Component({
  tag: 'search-box',
  styleUrl: 'search-box.scss',
  shadow: true,
})
export class SearchBox {
  @Prop() themeConfig: { colors: { light: { primaryColor: string }; dark: { primaryColor: string } } }
  @Prop() color: 'dark' | 'light' | 'system'
  @Prop() open: false

  @Watch('open')
  handleOpenChange(newValue: boolean) {
    searchState.open = newValue
  }

  @Listen('oramaItemClick')
  handleItemClick(event: CustomEvent) {
    // TODO: manage item click
    console.log('Item clicked', event.detail)
  }

  componentWillLoad() {
    searchState.open = this.open
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
