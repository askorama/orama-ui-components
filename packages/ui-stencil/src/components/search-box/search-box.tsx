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
            backgroundColor: 'black',
            color: 'white',
          }}
        >
          <orama-toggler />
        </div>
        {/* TODO: How to lazily load components chat component as it won't necessarily be used */}
        {globalContext.selectedTab === 'search' ? <orama-search /> : <orama-chat />}
      </Host>
    )
  }
}
