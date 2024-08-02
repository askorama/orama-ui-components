import { Component, h, Prop, State, Listen, Element } from '@stencil/core'

@Component({
  tag: 'orama-modal',
  styleUrl: 'orama-modal.scss',
  shadow: true,
})
export class OramaModal {
  @Prop() isOpen = false
  @Prop() title = ''
  @State() activeElement: HTMLElement
  @Element() el: HTMLElement

  private firstFocusableElement: HTMLElement
  private lastFocusableElement: HTMLElement

  @Listen('keydown', { target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (this.isOpen) {
      switch (ev.key) {
        case 'Tab':
          this.trapFocus(ev)
          break
        case 'Escape':
          this.closeModal()
          break
      }
    }
  }

  private trapFocus(event: KeyboardEvent) {
    const focusableElements = this.el.shadowRoot.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    const focusableArray = Array.from(focusableElements) as HTMLElement[]

    if (focusableArray.length > 0) {
      this.firstFocusableElement = focusableArray[0]
      this.lastFocusableElement = focusableArray[focusableArray.length - 1]

      if (event.shiftKey && document.activeElement === this.firstFocusableElement) {
        event.preventDefault()
        this.lastFocusableElement.focus()
      } else if (!event.shiftKey && document.activeElement === this.lastFocusableElement) {
        event.preventDefault()
        this.firstFocusableElement.focus()
      }
    }
  }

  private handleFocus() {
    const focusableElements = this.el.shadowRoot.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    const focusableArray = Array.from(focusableElements) as HTMLElement[]

    if (focusableArray.length > 0) {
      focusableArray[0].focus()
    }
  }

  private closeModal() {
    this.isOpen = false
  }

  componentDidLoad() {
    if (this.isOpen) {
      this.activeElement = document.activeElement as HTMLElement
      this.handleFocus()
    }
  }

  componentDidUpdate() {
    if (this.isOpen) {
      this.handleFocus()
    } else if (this.activeElement) {
      this.activeElement.focus()
    }
  }

  render() {
    return (
      <div
        class={`modal ${this.isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        aria-describedby="modalContent"
      >
        <div class="modal-inner">
          <h1 id="modalTitle" class="modal-title">
            {this.title}
          </h1>
          <div id="modalContent" class="modal-content">
            <slot />
          </div>
          <button onClick={() => this.closeModal()} type="button" class="modal-close">
            Close
          </button>
        </div>
      </div>
    )
  }
}
