import { Component, Host, Prop, State, Watch, h, Element } from '@stencil/core'

@Component({
  tag: 'orama-textarea',
  styleUrl: 'orama-textarea.scss',
})
export class OramaTextarea {
  @Element() el: HTMLTextAreaElement

  @Prop() value: string | null = ''
  @Prop() maxRows: number | string
  @Prop() minRows: number | string = 1
  @Prop() placeholder: string
  @Prop() autoFocus = false

  @State() height: number
  @State() startAdornmentWidth: number
  @State() endAdornmentWidth: number

  textarea!: HTMLTextAreaElement
  shadowTextarea!: HTMLTextAreaElement

  componentDidLoad() {
    this.syncHeight()
    this.startAdornmentWidth = this.getNamedSlotWidth('adornment-start')
    this.endAdornmentWidth = this.getNamedSlotWidth('adornment-end')
  }

  getNamedSlotWidth(slotName: string) {
    const slot = this.el.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement
    if (slot) {
      const assignedElements = slot.assignedElements()
      if (assignedElements.length > 0) {
        const firstAssignedElement = assignedElements[0] as HTMLElement
        const width = firstAssignedElement.offsetWidth
        return width
      }
    }
    return 0
  }

  @Watch('value')
  @Watch('maxRows')
  @Watch('minRows')
  handlePropsChange() {
    this.syncHeight()
  }

  getStyleValue(value: string) {
    return Number.parseInt(value, 10) || 0
  }

  calculateTextareaStyles() {
    const input = this.textarea
    const computedStyle = window.getComputedStyle(input)

    if (computedStyle.width === '0px') {
      return {
        outerHeightStyle: 0,
        overflowing: false,
      }
    }

    const inputShallow = this.shadowTextarea
    inputShallow.style.width = computedStyle.width
    inputShallow.value = input.value || this.placeholder || 'x'
    if (inputShallow.value.slice(-1) === '\n') {
      inputShallow.value += ' '
    }

    const boxSizing = computedStyle.boxSizing
    const padding = this.getStyleValue(computedStyle.paddingBottom) + this.getStyleValue(computedStyle.paddingTop)
    const border =
      this.getStyleValue(computedStyle.borderBottomWidth) + this.getStyleValue(computedStyle.borderTopWidth)

    const innerHeight = inputShallow.scrollHeight
    inputShallow.value = 'x'
    const singleRowHeight = inputShallow.scrollHeight

    let outerHeight = innerHeight

    if (this.minRows) {
      outerHeight = Math.max(Number(this.minRows) * singleRowHeight, outerHeight)
    }
    if (this.maxRows) {
      outerHeight = Math.min(Number(this.maxRows) * singleRowHeight, outerHeight)
    }
    outerHeight = Math.max(outerHeight, singleRowHeight)

    const outerHeightStyle = outerHeight + (boxSizing === 'border-box' ? padding + border : 0)
    const overflowing = Math.abs(outerHeight - innerHeight) <= 1

    return { outerHeightStyle, overflowing }
  }

  syncHeight() {
    const textareaStyles = this.calculateTextareaStyles()

    if (!textareaStyles) {
      return
    }

    const outerHeightStyle = textareaStyles.outerHeightStyle
    if (this.height !== outerHeightStyle) {
      this.height = outerHeightStyle
      this.textarea.style.height = `${outerHeightStyle}px`
    }
    this.textarea.style.overflow = textareaStyles.overflowing ? 'hidden' : ''
  }

  handleChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement
    if (!this.value) {
      this.syncHeight()
    }
    this.value = target.value
  }

  private getAllProps() {
    const props = {}

    for (let i = 0; i < this.el.attributes.length; i++) {
      const attr = this.el.attributes[i]
      props[attr.name] = attr.value
    }
    return props
  }

  render() {
    return (
      <Host>
        {/* TODO: We should calculate the adormnent width dinamically and apply the appding to the textarea  */}

        <slot name="adornment-start" />

        <textarea
          {...this.getAllProps()}
          autoFocus={this.autoFocus}
          value={this.value}
          onInput={this.handleChange}
          ref={(el) => (this.textarea = el as HTMLTextAreaElement)}
          rows={Number(this.minRows)}
          style={{
            height: this.height ? `${this.height}px` : undefined,
            paddingLeft: this.startAdornmentWidth ? `${this.startAdornmentWidth}px` : undefined,
            paddingRight: this.endAdornmentWidth ? `${this.endAdornmentWidth}px` : undefined,
          }}
          placeholder={this.placeholder}
        />
        {/* TODO: We should calculate the adormnent width dinamically and apply the appding to the textarea  */}
        <slot name="adornment-end" />

        {/* Textare below should be hidden from the user and it's used to calculate the height of the textarea */}
        {/* biome-ignore lint/a11y/noAriaHiddenOnFocusable: This component shouldn't be focusable */}
        <textarea
          aria-hidden="true"
          readonly
          ref={(el) => (this.shadowTextarea = el as HTMLTextAreaElement)}
          tabindex={-1}
          style={{
            visibility: 'hidden',
            position: 'absolute',
            overflow: 'hidden',
            height: '0',
            top: '0',
            left: '0',
            transform: 'translateZ(0)',
            paddingTop: '0',
            paddingBottom: '0',
            paddingLeft: this.startAdornmentWidth ? `${this.startAdornmentWidth}px` : undefined,
            paddingRight: this.endAdornmentWidth ? `${this.endAdornmentWidth}px` : undefined,
          }}
        />
      </Host>
    )
  }
}
