import { Component, Host, State, h } from '@stencil/core'
import { chatContext } from '@/context/chatContext'

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

  render() {
    return (
      <Host>
        {/* CHAT MESSAGES */}
        <orama-chat-messages-container />

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
                  <orama-button type="submit" onClick={this.handleSubmit} onKeyDown={this.handleSubmit}>
                    Ask
                  </orama-button>
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
