import { Component, Host, Prop, Watch, h } from '@stencil/core'
import { searchState } from '../../context/searchContext'
import { globalContext } from '../../context/searchBoxContext'

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

  componentWillLoad() {
    searchState.open = this.open
  }

  render() {
    if (!searchState.open) {
      return null
    }

    return (
      <Host>
        {/* Navigation bar */}
        <div
          style={{
            display: 'flex',
            padding: '16px 0',
            alginItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <orama-toggler />
        </div>

        <orama-search style={{ display: globalContext.selectedTab === 'search' ? 'flex' : 'none' }} />
        <orama-chat style={{ display: globalContext.selectedTab === 'chat' ? 'flex' : 'none' }} />
      </Host>
    )
  }
}
