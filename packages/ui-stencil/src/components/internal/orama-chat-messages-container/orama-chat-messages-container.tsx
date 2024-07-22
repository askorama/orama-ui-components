import { Component, Host, h } from '@stencil/core'
import { chatContext } from '@/context/chatContext'
import '@phosphor-icons/webcomponents/dist/icons/PhWarning.mjs'

@Component({
  tag: 'orama-chat-messages-container',
  styleUrl: 'orama-chat-messages-container.scss',
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
          {chatContext.isLoading && (
            <div class="message-wrapper">
              <orama-dots-loader />
            </div>
          )}
          {chatContext.error && (
            <div class="message-error">
              <ph-warning size={16} />
              <orama-text styledAs="span" inactive>
                An error occurred while trying to search. Please try again.
              </orama-text>
            </div>
          )}
        </div>
      </Host>
    )
  }
}
