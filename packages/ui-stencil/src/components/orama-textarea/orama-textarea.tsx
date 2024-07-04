import { Component, Host, Prop, State, Watch, h, Element } from '@stencil/core'

@Component({
  tag: 'orama-textarea',
  styleUrl: 'orama-textarea.scss',
  shadow: true
})
export class OramaTextarea {
  @Element() el: HTMLElement

  @Prop() value: string | null = ''
  @Prop() maxRows: number | string
  @Prop() minRows: number | string = 1
  @Prop() placeholder: string

  @State() height: number

  textarea!: HTMLTextAreaElement
  shadowTextarea!: HTMLTextAreaElement

  componentDidLoad() {
    this.syncHeight()
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
        overflowing: false
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
    console.log(this.getAllProps())
    return (
      <Host>
        <textarea
          {...this.getAllProps()}
          value={this.value}
          onInput={this.handleChange}
          ref={(el) => (this.textarea = el as HTMLTextAreaElement)}
          rows={Number(this.minRows)}
          style={{ height: this.height ? `${this.height}px` : undefined }}
          placeholder={this.placeholder}
        />

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
            paddingBottom: '0'
          }}
        />
      </Host>
    )
  }
}
