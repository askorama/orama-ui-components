import { Component, Prop, h, Element, Host } from '@stencil/core'
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
  @Prop() class?: string

  render() {
    const declaredProps = ['label', 'onClick', 'class']
    const buttonProps = getNonExplicitAttributes(this.el, declaredProps)

    return (
      <Host class={this.class}>
        <button class="chat-button" {...buttonProps} type="button">
          {this.label}
        </button>
      </Host>
    )
  }
}
