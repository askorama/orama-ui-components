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
          <orama-button type="button" variant="icon" aria-label="Exit">
            <ph-caret-left size="20px" />
          </orama-button>
        </div>
        <div class="corner-section center">
          <orama-toggler />
        </div>
        {/* TODO: uncomment when feature is ready */}
        <div class="corner-section end">
          {/* <orama-button type="button" variant="icon" aria-label="View history">
            <ph-clock size="20px" />
          </orama-button>
          <orama-button type="button" variant="icon" aria-label="Start new chat">
            <ph-plus size="20px" />
          </orama-button> */}
        </div>
      </Host>
    )
  }
}
