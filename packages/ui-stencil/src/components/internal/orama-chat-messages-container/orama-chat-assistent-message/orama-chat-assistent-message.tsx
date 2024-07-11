import { Component, Host, Prop, h } from '@stencil/core'
import type { TChatMessage } from '../../../../context/chatContext'

@Component({
  tag: 'orama-chat-assistent-message',
  styleUrl: 'orama-chat-assistent-message.scss',
})
export class OramaChatAssistentMessage {
  @Prop() message: TChatMessage

  render() {
    return (
      <Host>
        <div class="message-wrapper">
          <div>{this.message.content}</div>
          <div class="message-actions">
            <div>BTN</div>
            <div>BTN</div>
            <div>BTN</div>
          </div>
        </div>
        <div class="sources-wrapper">
          {/* TODO: We need to have a way to display this title only for screen readers so we can improve accessibility */}
          {/* <h2>Sources</h2> */}
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
