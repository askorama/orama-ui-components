import { Component, Prop, h, Element, Host, Watch } from '@stencil/core'
import { Icon } from '@/components/internal/icons'
import { getNonExplicitAttributes } from '@/utils/utils'

@Component({
  tag: 'orama-chat-button',
  styleUrl: 'orama-chat-button.scss',
  shadow: true,
})
/**
 * The orama-chat-button component is used to render a button element that will trigger the chat.
 */
export class OramaChatButton {
  @Element() el: HTMLButtonElement

  @Prop() label: string
  @Prop() active?: boolean = false
  @Prop() highlight?: boolean = false
  @Prop() class?: string

  @Watch('active')
  @Watch('highlight')
  highlightButton() {
    if (this.active && !this.highlight) {
      this.highlight = true
    }
  }

  render() {
    const declaredProps = ['label', 'onClick', 'class']
    const buttonProps = getNonExplicitAttributes(this.el, declaredProps)

    return (
      <Host class={this.class}>
        <button
          class={{
            'chat-button': true,
            'is-active': this.active,
            'is-highlighted': this.highlight,
          }}
          {...buttonProps}
          type="button"
        >
          <span class="icon">
            <Icon name="star" size={14} color="blue" />
          </span>
          {this.label}
        </button>
      </Host>
    )
  }
}
