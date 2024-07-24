import { Component, Host, State, h } from '@stencil/core'
import { chatContext } from '@/context/chatContext'
import '@phosphor-icons/webcomponents/dist/icons/PhPaperPlaneTilt.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhStop.mjs'

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
    // get latest interactions
    const lastInteraction = chatContext.interactions?.[chatContext.interactions.length - 1]
    const lastInteractionStatus = lastInteraction?.status
    const lastInteractionCompleted = lastInteractionStatus === 'done' || lastInteractionStatus === 'error'

    return (
      <Host>
        {/* CHAT MESSAGES */}
        <div class="messages-container-wrapper">
          <orama-chat-messages-container />
          {/* TODO: Provide a better animation */}
          {!chatContext.interactions?.length ? (
            <orama-chat-suggestions suggestions={SUGGESTIONS} suggestionClicked={this.handleSuggestionClick} />
          ) : null}
          {/* TODO: not required for chatbox, but maybe required for Searchbox v2 */}
          {/* <orama-logo-icon /> */}
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
                  {lastInteractionCompleted ? (
                    <orama-button
                      type="submit"
                      onClick={this.handleSubmit}
                      onKeyDown={this.handleSubmit}
                      disabled={!this.inputValue}
                    >
                      <ph-paper-plane-tilt size={16} />
                    </orama-button>
                  ) : (
                    <orama-button
                      type="submit"
                      onClick={this.handleAbortAnswerClick}
                      onKeyDown={this.handleAbortAnswerClick}
                    >
                      <ph-stop size={16} />
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
