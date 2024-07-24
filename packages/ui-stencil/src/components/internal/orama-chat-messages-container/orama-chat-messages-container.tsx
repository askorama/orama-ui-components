import { Component, Fragment, Host, h } from '@stencil/core'
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
          {chatContext.interactions.map((interaction, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={`interaction-${index}`}>
              <orama-chat-user-message interaction={{ ...interaction }} />
              <orama-chat-assistent-message interaction={{ ...interaction }} />
            </div>
          ))}
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
