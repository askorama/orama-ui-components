import { Component, Host, Prop, h } from '@stencil/core'
import type { TChatInteraction } from '@/context/chatContext'

@Component({
  tag: 'orama-chat-user-message',
  styleUrl: 'orama-chat-user-message.scss',
  shadow: true,
})
export class OramaChatUserMessage {
  @Prop() interaction: TChatInteraction

  render() {
    return (
      <Host>
        <div class="message-wrapper">{this.interaction.query}</div>
      </Host>
    )
  }
}
