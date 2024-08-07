import { Component, h, Prop, State, Listen, Element } from '@stencil/core'

@Component({
  tag: 'orama-modal',
  styleUrl: 'orama-modal.scss',
  scoped: true,
})
export class OramaModal {
  @Prop() open = false
  @Prop() mainTitle = ''
  @State() activeElement: HTMLElement
  @Element() el: HTMLElement

  private firstFocusableElement: HTMLElement
  private lastFocusableElement: HTMLElement

  @Listen('keydown', { target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (this.open) {
      switch (ev.key) {
        case 'Tab':
          this.trapFocus(ev)
          break
        case 'Escape':
          this.closeModal()
          break
        case 'ArrowDown':
          this.handleArrowNavigation(ev)
          break
        case 'ArrowUp':
          this.handleArrowNavigation(ev)
          break
      }
    }
  }

  private trapFocus(event: KeyboardEvent) {
    const focusableElements = this.el.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    const focusableArray = (Array.from(focusableElements) as HTMLElement[]).filter(
      (element) => element.offsetParent !== null,
    )

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

  private handleFocus() {
    const focusableElements = this.el.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    const focusableArray = (Array.from(focusableElements) as HTMLElement[]).filter(
      (element) => element.offsetParent !== null,
    )

    if (focusableArray.length > 0) {
      focusableArray[0].focus()
    }
  }

  private closeModal() {
    this.open = false
  }

  componentDidLoad() {
    if (this.open) {
      this.activeElement = document.activeElement as HTMLElement
      this.handleFocus()
    }
  }

  componentDidUpdate() {
    if (this.open) {
      this.handleFocus()
    } else if (this.activeElement) {
      this.activeElement.focus()
    }
  }

  handleArrowNavigation(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const focusableElements = this.el?.querySelectorAll('a[href], button, textarea, input, select')

      let focusableArray = Array.from(focusableElements) as HTMLElement[]
      focusableArray = focusableArray.filter((element) => element.tabIndex !== -1)

      const firstFocusableElement = focusableArray[0]
      const lastFocusableElement = focusableArray[focusableArray.length - 1]

      const focusedElement = this.el.querySelector(':focus') as HTMLElement
      const focusedIndex = focusableArray.indexOf(focusedElement)

      let nextFocusableElement: HTMLElement

      if (event.key === 'ArrowDown') {
        nextFocusableElement =
          focusedIndex === focusableArray.length - 1 ? firstFocusableElement : focusableArray[focusedIndex + 1]
        nextFocusableElement?.focus()
      } else if (event.key === 'ArrowUp') {
        nextFocusableElement = focusedIndex === 0 ? lastFocusableElement : focusableArray[focusedIndex - 1]
        nextFocusableElement?.focus()
      }
    }
  }

  render() {
    return (
      <div
        class={`modal ${this.open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        aria-describedby="modalContent"
      >
        <div class="modal-inner">
          <h1 id="modalTitle" class="modal-title">
            {this.mainTitle}
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
