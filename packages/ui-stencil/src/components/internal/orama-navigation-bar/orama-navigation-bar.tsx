import { Component, Host, h } from '@stencil/core'
import '@phosphor-icons/webcomponents/dist/icons/PhClock.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhPlus.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhCaretLeft.mjs'

@Component({
  tag: 'orama-navigation-bar',
  styleUrl: 'orama-navigation-bar.scss',
  scoped: true,
})
export class OramaNavigationBar {
  render() {
    return (
      <Host>
        <div class="corner-section start">
          <orama-button type="button" variant="icon">
            <ph-caret-left size="20px" />
          </orama-button>
        </div>
        <div class="section center">
          <orama-toggler />
        </div>
        <div class="corner-section end">
          <orama-button type="button" variant="icon">
            <ph-clock size="20px" />
          </orama-button>
          <orama-button type="button" variant="icon">
            <ph-plus size="20px" />
          </orama-button>
        </div>
      </Host>
    )
  }
}
