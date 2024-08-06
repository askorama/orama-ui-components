import { Component, Prop, State, h, Element, Watch, Event, Listen } from '@stencil/core'
import '@phosphor-icons/webcomponents/dist/icons/PhX.mjs'

@Component({
  tag: 'orama-sliding-panel',
  styleUrl: 'orama-sliding-panel.scss',
  scoped: true,
})
export class SlideInPanel {
  @Element() el: HTMLElement
  @Prop() open = false
  @Prop() closed: () => void
  @State() isOpen: boolean = this.open

  private firstFocusableElement: HTMLElement
  private lastFocusableElement: HTMLElement

  @Watch('open')
  openChanged() {
    this.isOpen = this.open
  }

  closePanel() {
    if (this.closed) {
      this.closed()
    }
    this.isOpen = false
  }

  private trapFocus(event: KeyboardEvent) {
    const focusableElements = this.el.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    const focusableArray = Array.from(focusableElements) as HTMLElement[]
    console.log('focusable', focusableArray)

    if (focusableArray.length > 0) {
      this.firstFocusableElement = focusableArray[0]
      this.lastFocusableElement = focusableArray[focusableArray.length - 1]

      const focusedElement = this.el.querySelector(':focus') as HTMLElement

      if (event.shiftKey && focusedElement === this.firstFocusableElement) {
        event.preventDefault()
        this.lastFocusableElement.focus()
      } else if (!event.shiftKey && focusedElement === this.lastFocusableElement) {
        event.preventDefault()
        this.firstFocusableElement.focus()
      }
    }
  }

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.stopPropagation()
      this.closePanel()
    }
    if (event.key === 'Tab') {
      this.trapFocus(event)
    }
  }

  render() {
    return (
      <div class={{ 'slide-container': true, 'slide-up': this.isOpen }}>
        <div class="slide-container-header">
          <button
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
        <div id="panel" role="region" aria-hidden={!this.isOpen} tabindex="-1" class="slide-container-inner">
          <slot />
        </div>
      </div>
    )
  }
}
