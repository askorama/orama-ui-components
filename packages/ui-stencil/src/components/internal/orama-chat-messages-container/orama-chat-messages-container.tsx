import { Component, Host, h } from '@stencil/core'
import { chatContext } from '../../../context/chatContext'

@Component({
  tag: 'orama-chat-messages-container',
  styleUrl: 'orama-chat-messages-container.scss',
  shadow: true,
})
export class OramaChatMessagesContainer {
  render() {
    return (
      <Host>
        <div class="messages-container">
          {chatContext.messages.map((message, index) =>
            message.role === 'user' ? (
              // biome-ignore lint/suspicious/noArrayIndexKey: There is not other key available form SDK right now
              <orama-chat-user-message key={index} message={{ ...message }} />
            ) : (
              // biome-ignore lint/suspicious/noArrayIndexKey: There is not other key available form SDK right now
              <orama-chat-assistent-message key={index} message={{ ...message }} />
            ),
          )}
        </div>
      </Host>
    )
  }
}
