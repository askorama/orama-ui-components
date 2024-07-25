import { Component, Host, Prop, h } from '@stencil/core'
import { chatContext, type TChatInteraction } from '@/context/chatContext'

@Component({
  tag: 'orama-chat-messages-container',
  styleUrl: 'orama-chat-messages-container.scss',
  shadow: true,
})
export class OramaChatMessagesContainer {
  @Prop() interactions: TChatInteraction[]

  // TODO: I'm not sure about having this here as we're breaking our rule of maintain service access only to the very top level component
  onSuggestionClick = (suggestion: string) => {
    chatContext.chatService?.sendQuestion(suggestion)
  }

  render() {
    return (
      <Host>
        <div class="messages-container">
          {this.interactions.map((interaction, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={`interaction-${index}`}>
              <orama-chat-user-message interaction={{ ...interaction }} />
              <orama-chat-assistent-message interaction={{ ...interaction }} />
              {interaction.latest && interaction.status === 'done' && interaction.relatedQueries?.length && (
                <div class="suggestions-wrapper">
                  <orama-chat-suggestions suggestions={interaction.relatedQueries} suggestionClicked={() => null} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Host>
    )
  }
}
