import { Component, Host, Prop, State, h } from '@stencil/core'
import type { TChatInteraction } from '@/context/chatContext'
import '@phosphor-icons/webcomponents/dist/icons/PhCopy.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhArrowsClockwise.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhThumbsDown.mjs'
import { chatContext } from '@/context/chatContext'
import { copyToClipboard } from '@/utils/utils'

@Component({
  tag: 'orama-chat-assistent-message',
  styleUrl: 'orama-chat-assistent-message.scss',
  shadow: true,
})
export class OramaChatAssistentMessage {
  @Prop() interaction: TChatInteraction

  @State() isCopied = false
  handleCopyToClipboard = () => {
    this.isCopied = true
    setTimeout(() => (this.isCopied = false), 1000)
    copyToClipboard(this.interaction.response)
  }

  @State() isRetrying = false
  handleRetryMessage = () => {
    // todo: replace with actual retry logic
    setTimeout(() => (this.isRetrying = false), 2000)
    this.isRetrying = !this.isRetrying
  }

  @State() isDisliked = false
  handleDislikeMessage = () => {
    // todo: replace with actual dislike logic
    this.isDisliked = !this.isDisliked
  }

  render() {
    const isLastInteraction =
      this.interaction.interactionId === chatContext.interactions[chatContext.interactions.length - 1].interactionId

    if (this.interaction.status === 'loading') {
      return (
        <div class="message-wrapper">
          <orama-dots-loader />
        </div>
      )
    }
    if (this.interaction.status === 'error') {
      return (
        <div class="message-wrapper">
          <orama-text styledAs="span" inactive>
            An error occurred while trying to search. Please try again.
          </orama-text>
        </div>
      )
    }

    if (this.interaction.response) {
      return (
        <Host>
          <div class="message-wrapper">
            <orama-markdown content={this.interaction.response} />
            {this.interaction.status === 'done' && (
              <div class="message-actions">
                <orama-button
                  type="button"
                  variant="icon"
                  onClick={this.handleCopyToClipboard}
                  onKeyDown={this.handleCopyToClipboard}
                  withTooltip={this.isCopied ? 'Copied!' : undefined}
                  aria-label="Copy message"
                >
                  <ph-copy />
                </orama-button>
                {isLastInteraction && (
                  <orama-button
                    type="button"
                    variant="icon"
                    onClick={this.handleRetryMessage}
                    onKeyDown={this.handleRetryMessage}
                    aria-label="Retry message"
                  >
                    <span class={this.isRetrying ? 'retrying' : ''}>
                      {this.isRetrying ? <ph-arrows-clockwise weight="fill" /> : <ph-arrows-clockwise />}
                    </span>
                  </orama-button>
                )}
                <orama-button
                  type="button"
                  variant="icon"
                  onClick={this.handleDislikeMessage}
                  onKeyDown={this.handleDislikeMessage}
                  aria-label="Dislike message"
                >
                  {this.isDisliked ? <ph-thumbs-down weight="fill" /> : <ph-thumbs-down />}
                </orama-button>
              </div>
            )}
          </div>
          {!!this.interaction.sources?.length && this.interaction.status === 'done' && (
            <div class="sources-wrapper">
              <h2 class="sr-only">Sources</h2>
              {this.interaction.sources.map((source, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <a href={source.path} class="source" key={`source-${index}`} target="_blank" rel="noopener noreferrer">
                  <orama-text as="h3" styledAs="span" class="source-title">
                    {source.title}
                  </orama-text>
                  <orama-text as="p" styledAs="span" class="source-subtitle">
                    {source.description}
                  </orama-text>
                </a>
              ))}
            </div>
          )}
        </Host>
      )
    }
  }
}
