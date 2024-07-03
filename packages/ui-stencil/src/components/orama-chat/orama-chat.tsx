import { Component, Host, State, h } from '@stencil/core'
import { OramaClient } from '@oramacloud/client'
import { ChatService } from '../../services/ChatService'
import { chatContext } from '../../context/chatContext'

@Component({
  tag: 'orama-chat',
  styleUrl: 'orama-chat.sass',
  shadow: true
})
export class OramaChat {
  @State() inputValue = ''

  private chatService: ChatService

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
      throw new Error('Char Service is not initialized')
    }

    this.chatService.sendQuestion(this.inputValue)
    this.inputValue = ''
  }

  render() {
    return (
      <Host>
        <form onSubmit={this.handleSubmit}>
          <div>Is loading: {String(chatContext.isLoading)}</div>
          <div>Is error: {String(chatContext.error)}</div>
          <div style={{ display: 'flex' }}>
            <input
              autofocus
              style={{ width: '100%' }}
              type="text"
              value={this.inputValue}
              onInput={(e: Event) => (this.inputValue = (e.target as HTMLInputElement).value)}
            />
            <button type="submit" onClick={this.handleSubmit}>
              Ask
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chatContext.messages.map((message, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: There is not other key available form SDK right now
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* TODO: We still do not have sources */}
                <div>
                  <span>Content: </span> {message.content}
                </div>
              </div>
            ))}
          </div>
        </form>
      </Host>
    )
  }
}
