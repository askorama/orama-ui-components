import { Component, Host, Prop, h } from '@stencil/core'
import { globalContext } from '@/context/GlobalContext'
import '@phosphor-icons/webcomponents/dist/icons/PhMagnifyingGlass.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhSparkle.mjs'

@Component({
  tag: 'orama-toggler',
  styleUrl: 'orama-toggler.scss',
  scoped: true,
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
            selected: globalContext.currentTask === 'search',
            animate: !this.firstRender || this.performInitialAnimation,
          }}
          onClick={() => (globalContext.currentTask = 'search')}
        >
          <span>Search</span>
          <ph-magnifying-glass size={16} />
        </button>
        <button
          type="button"
          class={{
            selected: globalContext.currentTask === 'chat',
            animate: !this.firstRender || this.performInitialAnimation,
          }}
          onClick={() => (globalContext.currentTask = 'chat')}
        >
          <ph-sparkle size={16} />
          <span>Ask AI</span>
        </button>
      </Host>
    )
  }
}
