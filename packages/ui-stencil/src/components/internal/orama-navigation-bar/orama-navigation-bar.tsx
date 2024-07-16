import { Component, Host, h } from '@stencil/core'
import '@phosphor-icons/webcomponents/PhClock'
import '@phosphor-icons/webcomponents/PhPlus'
import '@phosphor-icons/webcomponents/PhCaretLeft'
import { globalContext } from '@/context/GlobalContext'

@Component({
  tag: 'orama-navigation-bar',
  styleUrl: 'orama-navigation-bar.scss',
  shadow: true,
})
export class OramaNavigationBar {
  render() {
    return (
      <Host>
        <div class="corner-section start">
          <button class="navbar-button" type="button" onClick={() => (globalContext.open = false)}>
            <ph-caret-left />
          </button>
        </div>
        <div class="section center">
          <orama-toggler />
        </div>
        <div class="corner-section end">
          <button class="navbar-button" type="button">
            <ph-clock />
          </button>
          <button class="navbar-button" type="button">
            <ph-plus />
          </button>
        </div>
      </Host>
    )
  }
}
