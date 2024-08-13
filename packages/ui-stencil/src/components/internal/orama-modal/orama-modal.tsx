import { Component, h, Prop, State, Listen, Element, Event, type EventEmitter, Watch } from '@stencil/core'

export type ModalStatus = {
  open: boolean
  id: HTMLElement
}
@Component({
  tag: 'orama-modal',
  styleUrl: 'orama-modal.scss',
  scoped: true,
})
export class OramaModal {
  @Prop() open = false
  @Prop() closeOnEscape = true
  @Prop() closeOnOutsideClick = true
  @Prop() mainTitle = ''

  @State() activeElement: HTMLElement
  @State() modalIsOpen = this.open

  @Event() modalStatusChanged: EventEmitter<ModalStatus>

  @Element() el: HTMLElement

  private firstFocusableElement: HTMLElement
  private lastFocusableElement: HTMLElement
  private innerModalRef: HTMLElement

  @Listen('keydown', { target: 'document' })
  handleKeyDown(ev: KeyboardEvent) {
    ev.stopPropagation()
    if (this.modalIsOpen) {
      switch (ev.key) {
        case 'Tab':
          this.trapFocus(ev)
          break
        case 'Escape':
          if (this.closeOnEscape) {
            ev.preventDefault()
            ev.stopPropagation()
            this.closeModal()
          }
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

  @Watch('modalIsOpen')
  handleOpenChange(newValue: boolean) {
    this.modalStatusChanged.emit({
      open: newValue,
      id: this.el,
    })
  }

  @Watch('open')
  handleOpenPropChange(newValue: boolean) {
    this.modalIsOpen = newValue
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
    this.modalIsOpen = false
  }

  componentDidLoad() {
    if (this.modalIsOpen) {
      this.activeElement = document.activeElement as HTMLElement
      this.handleFocus()
    }
    this.el.addEventListener('click', (event) => {
      event.stopPropagation()
      event.preventDefault()
      if (!this.innerModalRef.contains(event.target as Node)) {
        this.closeModal()
      }
    })
  }

  componentDidUpdate() {
    if (this.modalIsOpen) {
      this.handleFocus()
    } else if (this.activeElement) {
      this.activeElement.focus()
    }
  }

  handleArrowNavigation(event: KeyboardEvent) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return

    const focusableElements = this.el?.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )

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

  render() {
    return (
      <div
        class={`modal ${this.modalIsOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        aria-describedby="modalContent"
      >
        <div class="modal-inner" ref={(ref) => (this.innerModalRef = ref)}>
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
