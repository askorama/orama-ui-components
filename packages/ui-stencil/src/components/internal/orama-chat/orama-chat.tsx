import { Component, Host, State, h } from '@stencil/core'
import { OramaClient } from '@oramacloud/client'
import { ChatService } from '../../../services/ChatService'

@Component({
  tag: 'orama-chat',
  styleUrl: 'orama-chat.scss',
  shadow: true
})
export class OramaChat {
  @State() inputValue = ''

  private chatService: ChatService

  // TODO: We probably want to use this oramaClient both in chat and search. We may want to uplift orama client to be a singleton
  componentWillLoad() {
    // TODO: Should not be hardcoded
    const oramaClient = new OramaClient({
      api_key: '6kHcoevr3zkbBmC2hHqlcNQrOgejS4ds',
      endpoint: 'https://cloud.orama.run/v1/indexes/orama-docs-pgjign'
    })

    this.chatService = new ChatService(oramaClient)
  }

  handleSubmit = (e: Event) => {
    e.preventDefault()

    if (!this.chatService) {
      throw new Error('Chat Service is not initialized')
    }

    this.chatService.sendQuestion(this.inputValue)
    this.inputValue = ''
  }

  render() {
    return (
      <Host>
        <orama-chat-messages-container />

        <div class="footer-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div style={{ display: 'flex' }}>
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
              >
                <div slot="adornment-end">
                  <button type="submit" onClick={this.handleSubmit}>
                    Ask
                  </button>
                </div>
              </orama-textarea>
            </div>
          </form>
          <div class="spacer" />
          <orama-text as="p" styledAs="small" style={{ textAlign: 'center' }}>
            Orama can make mistakes. Lorem ipsum dolor sit amet
          </orama-text>
        </div>
      </Host>
    )
  }
}
