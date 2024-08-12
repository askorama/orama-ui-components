import { Component, Host, Prop, h } from '@stencil/core'
import '@phosphor-icons/webcomponents/dist/icons/PhClock.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhPlus.mjs'
import '@phosphor-icons/webcomponents/dist/icons/PhCaretLeft.mjs'
import { chatContext } from '@/context/chatContext'

@Component({
  tag: 'orama-navigation-bar',
  styleUrl: 'orama-navigation-bar.scss',
  scoped: true,
})
export class OramaNavigationBar {
  @Prop() handleClose: () => void
  @Prop() showChatActions = false

  // TODO: maybe better to make this component context agnostic
  private handleStartNewChat = () => {
    chatContext.chatService?.resetChat()
  }

  render() {
    return (
      <Host>
        <div class="corner-section start">
          <orama-button
            type="button"
            variant="icon"
            aria-label="Exit"
            onClick={this.handleClose}
            onKeyDown={this.handleClose}
          >
            <ph-caret-left size="20px" />
          </orama-button>
        </div>
        <div class="corner-section center">
          <orama-toggler />
        </div>
        {this.showChatActions && (
          <div class="corner-section end">
            {/* <orama-button type="button" variant="icon" aria-label="View history">
            <ph-clock size="20px" />
          </orama-button> */}
            <orama-button
              type="button"
              variant="icon"
              aria-label="Start new chat"
              onClick={this.handleStartNewChat}
              onKeyDown={this.handleStartNewChat}
            >
              <ph-plus size="20px" />
            </orama-button>
          </div>
        )}
      </Host>
    )
  }
}
