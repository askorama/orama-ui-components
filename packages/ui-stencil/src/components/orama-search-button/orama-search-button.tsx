import { Component, ComponentInterface, Host, Prop, h } from '@stencil/core'
import { globalContext } from '@/context/GlobalContext'
import '@phosphor-icons/webcomponents/dist/icons/PhMagnifyingGlass.mjs'
import type { ColorScheme } from '@/types'

@Component({
  tag: 'orama-search-button',
  styleUrl: 'orama-search-button.scss',
  scoped: true,
})
export class SearchButton {
  @Prop() colorScheme: ColorScheme = 'light'

  private showSearchbox() {
    globalContext.open = true
  }

  private handleShortcutLabel() {
    const userAgent = navigator.userAgent
    const isMac = userAgent.includes('Mac')

    return isMac ? '⌘ K' : 'Ctrl + K'
  }

  render() {
    const shortcutLabel = this.handleShortcutLabel()

    return (
      <Host>
        <orama-button type="button" onClick={this.showSearchbox} onKeyDown={this.showSearchbox} variant="secondary">
          <span slot="adorment-start">
            <ph-magnifying-glass />
          </span>
          <slot />
          <span slot="adorment-end">{shortcutLabel}</span>
        </orama-button>
      </Host>
    )
  }
}
