import { Component, Host, Listen, Prop, State, h } from '@stencil/core'
import type { TChatMessage } from '@/context/chatContext'
import '@phosphor-icons/webcomponents/dist/icons/PhCopy.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhArrowsClockwise.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhThumbsDown.mjs'
import { copyToClipboard } from '@/utils/utils'

@Component({
  tag: 'orama-chat-assistent-message',
  styleUrl: 'orama-chat-assistent-message.scss',
  shadow: true,
})
export class OramaChatAssistentMessage {
  @Prop() message: TChatMessage

  @State() isCopied = false
  handleCopyToClipboard = () => {
    this.isCopied = true
    setTimeout(() => (this.isCopied = false), 1000)
    copyToClipboard(this.message.content)
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
    return (
      <Host>
        <div class="message-wrapper">
          <orama-markdown content={this.message.content} />
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
        </div>
        <div class="sources-wrapper">
          <h2 class="sr-only">Sources</h2>
          <div class="source">
            <orama-text as="h3" styledAs="span" class="source-title">
              Title title title
            </orama-text>
            <orama-text as="p" styledAs="span" class="source-subtitle">
              Subtitle subtitle subtitle
            </orama-text>
          </div>
          <div class="source">
            <orama-text as="h3" styledAs="span" class="source-title">
              Title title title
            </orama-text>
            <orama-text as="p" styledAs="span" class="source-subtitle">
              Subtitle subtitle subtitle
            </orama-text>
          </div>
          <div class="source">
            <orama-text as="h3" styledAs="span" class="source-title">
              Title title title
            </orama-text>
            <orama-text as="p" styledAs="span" class="source-subtitle">
              Subtitle subtitle subtitle
            </orama-text>
          </div>
          <div class="source">
            <orama-text as="h3" styledAs="span" class="source-title">
              Title title title
            </orama-text>
            <orama-text as="p" styledAs="span" class="source-subtitle">
              Subtitle subtitle subtitle
            </orama-text>
          </div>
        </div>
      </Host>
    )
  }
}
