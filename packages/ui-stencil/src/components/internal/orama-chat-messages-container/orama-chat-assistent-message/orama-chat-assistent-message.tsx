import { Component, Host, Prop, State, h, Listen, Watch } from '@stencil/core'
import type { TChatInteraction } from '@/context/chatContext'
import '@phosphor-icons/webcomponents/dist/icons/PhCopy.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhArrowsClockwise.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhThumbsDown.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhWarning.mjs'
import { chatContext, TAnswerStatus } from '@/context/chatContext'
import { copyToClipboard } from '@/utils/utils'

@Component({
  tag: 'orama-chat-assistent-message',
  styleUrl: 'orama-chat-assistent-message.scss',
  scoped: true,
})
export class OramaChatAssistentMessage {
  @Prop() interaction: TChatInteraction
  @State() carouselEnd = false
  @State() carouselStart = true

  carouselSourceRef!: HTMLElement

  @State() isCopied = false
  handleCopyToClipboard = () => {
    this.isCopied = true
    setTimeout(() => (this.isCopied = false), 1000)
    copyToClipboard(this.interaction.response)
  }

  @State() isDisliked = false
  handleDislikeMessage = () => {
    // todo: replace with actual dislike logic
    this.isDisliked = !this.isDisliked
  }

  private handleRetryMessage = () => {
    chatContext.chatService?.regenerateLatest()
  }

  private handleCarouselMove(next = true) {
    const carousel = this.carouselSourceRef
    const slide = carousel.querySelector('.source')
    const slideWidth = slide.clientWidth
    carousel.scrollLeft = carousel.scrollLeft + (next ? slideWidth : -slideWidth)

    if (next) {
      this.carouselStart = false
      this.carouselEnd = carousel.scrollLeft === carousel.scrollWidth - carousel.clientWidth
    } else {
      this.carouselStart = carousel.scrollLeft - slideWidth === 0
      this.carouselEnd = false
    }
  }

  render() {
    if (this.interaction.status === 'loading') {
      return (
        <div class="message-wrapper">
          <orama-dots-loader />
        </div>
      )
    }
    if (this.interaction.status === 'error') {
      return (
        <div class="message-error">
          <ph-warning size={16} />
          <orama-text styledAs="span" inactive>
            An error occurred while trying to search. Please try again.
          </orama-text>
        </div>
      )
    }

    if (!this.interaction.sources?.length) {
      return
    }

    return (
      <Host>
        {!!this.interaction.sources?.length && (
          // TODO: move this to a separate component orama-sources
          <div class="sources-outer-wrapper">
            <h2 class="sr-only">Sources</h2>
            {/* {!this.carouselStart && (
              <button
                class="carousel-arrow carousel-arrow--prev"
                onClick={() => this.handleCarouselMove(false)}
                type="button"
              >
                &#8249;
              </button>
            )}

            {!this.carouselEnd && (
              <button
                class="carousel-arrow carousel-arrow--next"
                onClick={() => this.handleCarouselMove(true)}
                type="button"
              >
                &#8250;
              </button>
            )} */}
            <div class="sources-wrapper" ref={(el) => (this.carouselSourceRef = el)}>
              {this.interaction.sources.map((source, index) => (
                <a
                  href={`${chatContext.sourceBaseURL}${source[chatContext.sourcesMap.path]}`}
                  class="source"
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={`source-${index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`source-${index}`}
                >
                  <orama-text as="h3" styledAs="span" class="source-title">
                    {source[chatContext.sourcesMap.title]}
                  </orama-text>
                  <orama-text as="p" styledAs="span" class="source-subtitle" variant="tertiary">
                    {source[chatContext.sourcesMap.description]}
                  </orama-text>
                </a>
              ))}
            </div>
          </div>
        )}
        <div class="message-wrapper">
          {!this.interaction.response ? <orama-dots-loader /> : <orama-markdown content={this.interaction.response} />}

          <div class={{ 'message-actions': true, hidden: this.interaction.status !== TAnswerStatus.done }}>
            {this.interaction.latest && (
              <orama-button
                type="button"
                variant="icon"
                onClick={this.handleRetryMessage}
                onKeyDown={this.handleRetryMessage}
                aria-label="Retry message"
              >
                <ph-arrows-clockwise size="16px" />
              </orama-button>
            )}
            <orama-button
              type="button"
              variant="icon"
              onClick={this.handleCopyToClipboard}
              onKeyDown={this.handleCopyToClipboard}
              withTooltip={this.isCopied ? 'Copied!' : undefined}
              aria-label="Copy message"
            >
              <ph-copy size="16px" />
            </orama-button>
            <orama-button
              type="button"
              variant="icon"
              onClick={this.handleDislikeMessage}
              onKeyDown={this.handleDislikeMessage}
              aria-label="Dislike message"
            >
              {this.isDisliked ? <ph-thumbs-down weight="fill" size="16px" /> : <ph-thumbs-down size="16px" />}
            </orama-button>
          </div>
        </div>
      </Host>
    )
  }
}
