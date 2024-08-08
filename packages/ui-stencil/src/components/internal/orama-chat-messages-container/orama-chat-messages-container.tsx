import { Component, Host, Prop, h } from '@stencil/core'
import { chatContext, type TChatInteraction } from '@/context/chatContext'

@Component({
  tag: 'orama-chat-messages-container',
  styleUrl: 'orama-chat-messages-container.scss',
  scoped: true,
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
          {this.interactions.map((interaction) => (
            <div key={interaction.interactionId}>
              <orama-chat-user-message interaction={{ ...interaction }} />
              <orama-chat-assistent-message interaction={{ ...interaction }} />
              {interaction.latest && interaction.status === 'done' && !!interaction.relatedQueries?.length && (
                <div class="suggestions-wrapper">
                  <orama-chat-suggestions
                    suggestions={interaction.relatedQueries}
                    suggestionClicked={this.onSuggestionClick}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Host>
    )
  }
}
