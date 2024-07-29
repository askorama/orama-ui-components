import { Component, Host, Prop, State, Watch, h } from '@stencil/core'
import { chatContext, TAnswerStatus } from '@/context/chatContext'
import '@phosphor-icons/webcomponents/dist/icons/PhPaperPlaneTilt.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhStop.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhArrowCircleDown.mjs'

// TODO: Hardcoding suggestions for now
const SUGGESTIONS = [
  'Why is Orama better than other search or AI solutions?',
  'How does Orama ensure correct answers?',
  'What are the steps to implement?',
]

const BOTTOM_THRESHOLD = 1

@Component({
  tag: 'orama-chat',
  styleUrl: 'orama-chat.scss',
})
export class OramaChat {
  @Prop() placeholder?: string = 'Ask me anything'
  @Prop() sourceBaseUrl?: string = ''
  @State() inputValue = ''
  messagesContainerRef!: HTMLElement
  isScrolling = false
  prevScrollTop = 0
  scrollTarget = 0

  isScrollOnBottom = () => {
    const scrollableHeight = this.messagesContainerRef.scrollHeight - this.messagesContainerRef.clientHeight

    return this.messagesContainerRef.scrollTop + BOTTOM_THRESHOLD >= scrollableHeight
  }

  scrollToBottom = (options = { animated: true }) => {
    if (this.messagesContainerRef) {
      if (!options.animated) {
        this.messagesContainerRef.scrollTop = this.messagesContainerRef.scrollHeight

        chatContext.lockScrollOnBottom = true
        return
      }

      this.isScrolling = true
      const startTime = performance.now()
      const startPosition = this.messagesContainerRef.scrollTop

      const duration = 300 // Custom duration in milliseconds

      const animateScroll = (currentTime: number) => {
        if (!this.messagesContainerRef || !this.isScrolling) {
          return
        }
        const scrollTarget = this.messagesContainerRef.scrollHeight - this.messagesContainerRef.clientHeight
        const elapsedTime = currentTime - startTime
        const scrollProgress = Math.min(1, elapsedTime / duration)
        const easeFunction = this.easeInOutQuad(scrollProgress)
        const scrollTo = startPosition + (scrollTarget - startPosition) * easeFunction

        this.messagesContainerRef.scrollTo(0, scrollTo)

        if (elapsedTime < duration) {
          requestAnimationFrame(animateScroll)
        } else {
          this.isScrolling = false
        }
      }

      requestAnimationFrame(animateScroll)
    }
  }

  // Easing function for smooth scroll animation
  easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  recalculateLockOnBottom = () => {
    // Get the current scroll position
    const currentScrollTop = this.messagesContainerRef.scrollTop

    const scrollOnBottom = this.isScrollOnBottom()

    chatContext.lockScrollOnBottom = scrollOnBottom
    if (scrollOnBottom) {
      this.isScrolling = false
    }

    // Update the previous scroll position
    this.prevScrollTop = currentScrollTop
  }

  handleWheel = (e: WheelEvent) => {
    this.recalculateLockOnBottom()
  }

  componentDidLoad() {
    this.messagesContainerRef.addEventListener('wheel', this.handleWheel)
    this.recalculateLockOnBottom()
    chatContext.sourceBaseURL = this.sourceBaseUrl
  }

  componentDidUpdate() {
    if (chatContext.lockScrollOnBottom && !this.isScrolling) {
      this.scrollToBottom({ animated: false })
    }
  }

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
    const lastInteraction = chatContext.interactions?.[chatContext.interactions.length - 1]
    const lastInteractionStatus = lastInteraction?.status
    const lastInteractionStreaming = lastInteractionStatus === TAnswerStatus.streaming

    // ? Question: Maybe should be a orama-button variant?
    return (
      <Host>
        <div class={{ header: true, hidden: chatContext.interactions?.length === 0 }}>
          <button
            type="button"
            onClick={() => chatContext.chatService.resetChat()}
            aria-hidden={chatContext.interactions?.length === 0}
          >
            <ph-arrow-clockwise weight="fill" size="14" /> Clear chat
          </button>
        </div>
        {/* CHAT MESSAGES */}
        <div class={'messages-container-wrapper-non-scrollable'}>
          <div class="messages-container-wrapper" ref={(ref) => (this.messagesContainerRef = ref)}>
            {chatContext.interactions?.length ? (
              <orama-chat-messages-container interactions={chatContext.interactions} />
            ) : null}

            {/* TODO: Provide a better animation */}
            {!chatContext.interactions?.length ? (
              <orama-chat-suggestions suggestions={SUGGESTIONS} suggestionClicked={this.handleSuggestionClick} />
            ) : null}
            {/* TODO: not required for chatbox, but maybe required for Searchbox v2 */}
            {/* <orama-logo-icon /> */}
          </div>
          {!chatContext.lockScrollOnBottom && (
            <button
              class="lock-scroll-on-bottom-button-wrapper"
              type="button"
              onClick={() => {
                chatContext.lockScrollOnBottom = true
                this.scrollToBottom({ animated: true })
              }}
            >
              <ph-arrow-circle-down size={'18px'} />
            </button>
          )}
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
                placeholder={this.placeholder}
              >
                <div slot="adornment-end">
                  {lastInteractionStreaming ? (
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
            Orama can make mistakes. Please verify the information.
          </orama-text>
        </div>
      </Host>
    )
  }
}
