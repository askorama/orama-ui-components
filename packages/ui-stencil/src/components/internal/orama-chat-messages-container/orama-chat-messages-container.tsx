import { Component, Fragment, Host, h } from '@stencil/core'
import { chatContext } from '@/context/chatContext'

@Component({
  tag: 'orama-chat-messages-container',
  styleUrl: 'orama-chat-messages-container.scss',
})
export class OramaChatMessagesContainer {
  render() {
    return (
      <Host>
        <div class="messages-container">
          {chatContext.interactions.map((interaction, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={`interaction-${index}`}>
              <orama-chat-user-message interaction={{ ...interaction }} />
              <orama-chat-assistent-message interaction={{ ...interaction }} />
            </div>
          ))}
        </div>
      </Host>
    )
  }
}
