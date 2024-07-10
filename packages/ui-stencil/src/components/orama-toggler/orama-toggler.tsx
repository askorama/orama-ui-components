import { Component, Host, h } from '@stencil/core'
import { globalContext } from '../../context/searchBoxContext'
import '@phosphor-icons/webcomponents/PhMagnifyingGlass'
import '@phosphor-icons/webcomponents/PhSparkle'

@Component({
  tag: 'orama-toggler',
  styleUrl: 'orama-toggler.scss',
  shadow: true,
})
export class OramaToggler {
  render() {
    return (
      <Host>
        <button
          type="button"
          class={{ selected: globalContext.selectedTab === 'search' }}
          onClick={() => (globalContext.selectedTab = 'search')}
        >
          <span>Search</span>
          <ph-magnifying-glass size={16} />
        </button>
        <button
          type="button"
          class={{ selected: globalContext.selectedTab === 'chat' }}
          onClick={() => (globalContext.selectedTab = 'chat')}
        >
          <ph-sparkle size={16} />
          <span>Ask AI</span>
        </button>
      </Host>
    )
  }
}
