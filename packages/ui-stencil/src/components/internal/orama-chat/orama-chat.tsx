import { Component, Host, State, h } from '@stencil/core'
import { chatContext } from '@/context/chatContext'
import '@phosphor-icons/webcomponents/PhPaperPlaneTilt'
import '@phosphor-icons/webcomponents/PhStop'

// TODO: Hardcoding suggestions for now
const SUGGESTIONS = ['How to get started?', 'What are the prices?', 'What is Orama?']

@Component({
  tag: 'orama-chat',
  styleUrl: 'orama-chat.scss',
})
export class OramaChat {
  @State() inputValue = ''

  handleSubmit = (e: Event) => {
    e.preventDefault()

    if (chatContext.chatService === null) {
      throw new Error('Chat Service is not initialized')
    }

    chatContext.chatService.sendQuestion(this.inputValue)
    this.inputValue = ''
  }

  handleAbortAnswerClick = () => {
    chatContext.chatService.abortAnswer()
  }

  handleSuggestionClick = (suggestion: string) => {
    chatContext.chatService.sendQuestion(suggestion)
    this.inputValue = ''
  }

  render() {
    return (
      <Host>
        {/* CHAT MESSAGES */}
        <div class="messages-container-wrapper">
          <orama-chat-messages-container />
          {/* TODO: Provide a better animation */}
          {!chatContext.messages.length && !chatContext.isLoading ? (
            <orama-chat-suggestions suggestions={SUGGESTIONS} suggestionClicked={this.handleSuggestionClick} />
          ) : null}
          <orama-logo-icon />
        </div>

        {/* CHAT INPUT */}
        <div class="chat-form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div class="chat-input">
              <orama-textarea
                autoFocus
                maxRows={4}
                value={this.inputValue}
                onKeyDown={(e: KeyboardEvent) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    this.handleSubmit(e)
                    e.preventDefault()
                  }
                }}
                onInput={(e: Event) => {
                  this.inputValue = (e.target as HTMLInputElement).value
                }}
                placeholder="Ask me anything"
              >
                <div slot="adornment-end">
                  {chatContext.isLoading ? (
                    <orama-button
                      type="submit"
                      onClick={this.handleAbortAnswerClick}
                      onKeyDown={this.handleAbortAnswerClick}
                    >
                      <ph-stop size={16} />
                    </orama-button>
                  ) : (
                    <orama-button
                      type="submit"
                      onClick={this.handleSubmit}
                      onKeyDown={this.handleSubmit}
                      disabled={!this.inputValue}
                    >
                      <ph-paper-plane-tilt size={16} />
                    </orama-button>
                  )}
                </div>
              </orama-textarea>
            </div>
          </form>
          <orama-text as="p" styledAs="small" align="center">
            Orama can make mistakes. Lorem ipsum dolor sit amet
          </orama-text>
        </div>
      </Host>
    )
  }
}
