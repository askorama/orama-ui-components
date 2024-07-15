import { Component, Host, Prop, h } from '@stencil/core'
import { globalContext } from '@/context/GlobalContext'
import '@phosphor-icons/webcomponents/PhMagnifyingGlass'
import '@phosphor-icons/webcomponents/PhSparkle'

@Component({
  tag: 'orama-toggler',
  styleUrl: 'orama-toggler.scss',
})
export class OramaToggler {
  @Prop() performInitialAnimation = false
  private firstRender = true

  componentWillLoad() {
    if (this.performInitialAnimation) {
      this.firstRender = false
    }
  }

  componentDidLoad() {
    if (this.firstRender) {
      this.firstRender = false
    }
  }

  render() {
    return (
      <Host>
        <button
          type="button"
          class={{
            selected: globalContext.selectedTab === 'search',
            animate: !this.firstRender || this.performInitialAnimation,
          }}
          onClick={() => (globalContext.selectedTab = 'search')}
        >
          <span>Search</span>
          <ph-magnifying-glass size={16} />
        </button>
        <button
          type="button"
          class={{
            selected: globalContext.selectedTab === 'chat',
            animate: !this.firstRender || this.performInitialAnimation,
          }}
          onClick={() => (globalContext.selectedTab = 'chat')}
        >
          <ph-sparkle size={16} />
          <span>Ask AI</span>
        </button>
      </Host>
    )
  }
}
