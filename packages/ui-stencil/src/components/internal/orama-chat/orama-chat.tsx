import { Component, Host, Prop, State, Watch, h } from '@stencil/core'
import { chatContext, chatStore, TAnswerStatus } from '@/context/chatContext'
import type { SourcesMap } from '@/types'
import '@phosphor-icons/webcomponents/dist/icons/PhPaperPlaneTilt.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhStopCircle.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhArrowDown.mjs'

const BOTTOM_THRESHOLD = 1

@Component({
  tag: 'orama-chat',
  styleUrl: 'orama-chat.scss',
})
export class OramaChat {
  @Prop() placeholder?: string = 'Ask me anything'
  @Prop() sourceBaseUrl?: string = ''
  @Prop() linksTarget?: string
  @Prop() linksRel?: string
  @Prop() sourcesMap?: SourcesMap
  @Prop() showClearChat?: boolean = true
  @Prop() defaultTerm?: string
  @Prop() focusInput?: boolean = false
  @Prop() suggestions?: string[]

  @State() inputValue = ''
  @State() showGoToBottomButton = false

  @Watch('defaultTerm')
  handleDefaultTermChange() {
    if (this.defaultTerm) {
      chatContext.chatService?.sendQuestion(this.defaultTerm)
    }
  }

  @Watch('focusInput')
  focusInputWatcher() {
    this.handleFocus()
  }

  messagesContainerRef!: HTMLElement
  nonScrollableMessagesContainerRef!: HTMLElement
  textareaRef!: HTMLOramaTextareaElement
  isScrolling = false
  prevScrollTop = 0
  scrollTarget = 0

  pendingNewInteractionSideEffects = false

  scrollableContainerResizeObserver: ResizeObserver
  nonScrollableContainerResizeObserver: ResizeObserver

  lockScrollOnBottom = false

  handleFocus = () => {
    if (this.focusInput) {
      this.textareaRef?.focus()
    }
  }

  calculateIsScrollOnBottom = () => {
    const scrollableHeight = this.messagesContainerRef.scrollHeight - this.messagesContainerRef.clientHeight

    return this.messagesContainerRef.scrollTop + BOTTOM_THRESHOLD >= scrollableHeight
  }

  scrollToBottom = (
    options: { animated: boolean; onScrollDone?: () => void } = { animated: true, onScrollDone: () => {} },
  ) => {
    if (!this.messagesContainerRef) {
      return
    }

    if (!options.animated) {
      this.messagesContainerRef.scrollTop = this.messagesContainerRef.scrollHeight
      options.onScrollDone()
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
        options.onScrollDone()
      }
    }

    requestAnimationFrame(animateScroll)
  }

  // Easing function for smooth scroll animation
  easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  }

  recalculateGoBoToBottomButton = () => {
    const isContainerOverflowing = this.calculateIsContainerOverflowing()
    if (!isContainerOverflowing) {
      this.showGoToBottomButton = false
      return
    }

    this.showGoToBottomButton = !this.calculateIsScrollOnBottom()
  }

  handleWheel = (e: WheelEvent) => {
    const isContainerOverflowing = this.calculateIsContainerOverflowing()
    if (!isContainerOverflowing) {
      this.lockScrollOnBottom = false
      this.showGoToBottomButton = false
      return
    }

    // Get the current scroll position
    const currentScrollTop = this.messagesContainerRef.scrollTop

    this.showGoToBottomButton = !this.calculateIsScrollOnBottom()

    this.lockScrollOnBottom = !this.showGoToBottomButton
    if (!this.showGoToBottomButton) {
      this.isScrolling = false
    }

    // Update the previous scroll position
    this.prevScrollTop = currentScrollTop
  }

  setSources = () => {
    chatContext.sourceBaseURL = this.sourceBaseUrl
    chatContext.sourcesMap = {
      ...chatContext.sourcesMap,
      ...this.sourcesMap,
    }
    chatContext.linksTarget = this.linksTarget
    chatContext.linksRel = this.linksRel
  }

  componentWillLoad() {
    this.handleFocus()
  }

  componentDidLoad() {
    this.messagesContainerRef.addEventListener('wheel', this.handleWheel)
    this.setSources()

    this.scrollableContainerResizeObserver = new ResizeObserver(() => {
      this.recalculateGoBoToBottomButton()
    })
    this.scrollableContainerResizeObserver.observe(this.messagesContainerRef)

    this.nonScrollableContainerResizeObserver = new ResizeObserver(() => {
      if (this.pendingNewInteractionSideEffects) {
        this.pendingNewInteractionSideEffects = false
        this.lockScrollOnBottom = false
        this.scrollToBottom({
          animated: true,
          onScrollDone: () => {
            this.recalculateGoBoToBottomButton()
          },
        })

        return
      }

      if (this.lockScrollOnBottom && !this.isScrolling) {
        this.scrollToBottom({
          animated: false,
          onScrollDone: () => {
            this.recalculateGoBoToBottomButton()
          },
        })
      }

      this.recalculateGoBoToBottomButton()
    })

    this.nonScrollableContainerResizeObserver.observe(this.nonScrollableMessagesContainerRef)
  }

  connectedCallback() {
    chatStore.on('set', (prop, newInteractions, oldInteractions) => {
      if (prop !== 'interactions') {
        return
      }

      if (oldInteractions?.length < newInteractions?.length) {
        this.lockScrollOnBottom = false
        this.pendingNewInteractionSideEffects = true
      }
    })
  }

  disconnectedCallback() {
    this.messagesContainerRef.removeEventListener('wheel', this.handleWheel)
    this.scrollableContainerResizeObserver.disconnect()
    this.nonScrollableContainerResizeObserver.disconnect()
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
    if (chatContext.chatService === null) {
      throw new Error('Chat Service is not initialized')
    }

    chatContext.chatService.sendQuestion(suggestion)
    this.inputValue = ''
  }

  calculateIsContainerOverflowing = () => {
    if (!this.messagesContainerRef) {
      return false
    }

    return this.messagesContainerRef.scrollHeight > this.messagesContainerRef.clientHeight
  }

  render() {
    const lastInteraction = chatContext.interactions?.[chatContext.interactions.length - 1]
    const lastInteractionStatus = lastInteraction?.status

    // ? Question: Maybe should be a orama-button variant?
    return (
      <Host>
        {this.showClearChat && (
          <div class={{ header: true, hidden: chatContext.interactions?.length === 0 }}>
            <button
              type="button"
              onClick={() => chatContext.chatService.resetChat()}
              aria-hidden={chatContext.interactions?.length === 0}
            >
              <ph-arrow-clockwise weight="fill" size="14" /> Clear chat
            </button>
          </div>
        )}
        {/* CHAT MESSAGES */}
        <div class={'messages-container-wrapper-non-scrollable'}>
          <div
            class={`messages-container-wrapper ${!chatContext.interactions?.length ? 'isEmpty' : ''}`}
            ref={(ref) => (this.messagesContainerRef = ref)}
          >
            <div ref={(ref) => (this.nonScrollableMessagesContainerRef = ref)}>
              {chatContext.interactions?.length ? (
                <orama-chat-messages-container interactions={chatContext.interactions} />
              ) : null}

              {/* TODO: Provide a better animation */}
              {!chatContext.interactions?.length && !!this.suggestions?.length ? (
                <div class="suggestions-wrapper">
                  <orama-chat-suggestions
                    suggestions={this.suggestions}
                    suggestionClicked={this.handleSuggestionClick}
                  />
                </div>
              ) : null}
              {/* TODO: not required for chatbox, but maybe required for Searchbox v2 */}
              {/* <orama-logo-icon /> */}
            </div>
          </div>
          {this.showGoToBottomButton && (
            <button
              class="lock-scroll-on-bottom-button-wrapper"
              type="button"
              onClick={() => {
                this.lockScrollOnBottom = true
                this.scrollToBottom({ animated: true, onScrollDone: () => this.recalculateGoBoToBottomButton() })
              }}
            >
              <ph-arrow-down size={'18px'} />
            </button>
          )}
        </div>

        {/* CHAT INPUT */}
        <div class="chat-form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div class="chat-input">
              <orama-textarea
                ref={(ref) => (this.textareaRef = ref)}
                autoFocus={this.focusInput}
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
                  {[TAnswerStatus.streaming, TAnswerStatus.rendering, TAnswerStatus.loading].includes(
                    lastInteractionStatus,
                  ) ? (
                    <orama-button
                      type="submit"
                      onClick={this.handleAbortAnswerClick}
                      onKeyDown={this.handleAbortAnswerClick}
                      disabled={lastInteractionStatus !== TAnswerStatus.rendering}
                      aria-label="Abort answer"
                    >
                      <ph-stop-circle size={16} />
                    </orama-button>
                  ) : (
                    <orama-button
                      type="submit"
                      onClick={this.handleSubmit}
                      onKeyDown={this.handleSubmit}
                      disabled={!this.inputValue}
                      aria-label="Send question"
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
