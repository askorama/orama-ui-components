import { Component, Prop, State, h, Element, Watch } from '@stencil/core'
import '@phosphor-icons/webcomponents/dist/icons/PhX.mjs'

@Component({
  tag: 'orama-sliding-panel',
  styleUrl: 'orama-sliding-panel.scss',
  shadow: true,
})
export class SlideInPanel {
  @Element() el: HTMLElement
  @Prop() open = false
  @Prop() onClosed: () => void
  @State() isOpen: boolean = this.open

  panelRef: HTMLElement
  buttonRef: HTMLElement

  @Watch('open')
  openChanged() {
    this.isOpen = this.open
  }

  closePanel() {
    if (this.onClosed) {
      this.onClosed()
    }
    this.isOpen = false
  }

  render() {
    return (
      <div class={{ 'slide-container': true, 'slide-up': this.isOpen }}>
        <div class="slide-container-header">
          <button
            ref={(el) => (this.buttonRef = el as HTMLElement)}
            onClick={() => this.closePanel()}
            aria-expanded={this.isOpen ? 'true' : 'false'}
            aria-label="Close panel"
            aria-controls="panel"
            class="close-button"
            type="button"
          >
            <ph-x size="18" />
          </button>
        </div>
        <div
          id="panel"
          role="region"
          aria-hidden={!this.isOpen}
          tabindex="-1"
          ref={(el) => (this.panelRef = el as HTMLElement)}
          class="slide-container-inner"
        >
          <slot />
        </div>
      </div>
    )
  }
}
