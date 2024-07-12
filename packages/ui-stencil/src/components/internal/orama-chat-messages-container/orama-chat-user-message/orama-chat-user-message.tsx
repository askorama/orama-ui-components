import { Component, Host, Prop, h } from '@stencil/core'
import type { TChatMessage } from '@/context/chatContext'

@Component({
  tag: 'orama-chat-user-message',
  styleUrl: 'orama-chat-user-message.scss',
})
export class OramaChatUserMessage {
  @Prop() message: TChatMessage

  render() {
    return (
      <Host>
        <div class="message-wrapper">{this.message.content}</div>
      </Host>
    )
  }
}
