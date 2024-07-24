import { Component, Host, h, Prop, Watch } from '@stencil/core'
import { chatContext } from '@/context/chatContext'
import { ChatService } from '@/services/ChatService'
import { initOramaClient } from '@/utils/utils'
import type { CloudIndexConfig } from '@/types'
import '@phosphor-icons/webcomponents/dist/icons/PhArrowClockwise.mjs'

@Component({
  tag: 'orama-chat-box',
  styleUrl: 'orama-chat-box.scss',
  shadow: true,
})
export class ChatBox {
  @Prop() index: CloudIndexConfig
  @Prop() placeholder?

  @Watch('cloudIndex')
  indexChanged() {
    this.startChatService()
  }

  componentWillLoad() {
    this.startChatService()
  }

  startChatService() {
    const oramaClient = initOramaClient(this.index)
    chatContext.chatService = new ChatService(oramaClient)
  }

  render() {
    if (!chatContext.chatService) {
      return <orama-text as="p">Unable to initialize chat service</orama-text>
    }

    return (
      // TODO: only dark theme supported to start
      <Host id="orama-ui-chatbox" class="theme-dark">
        {/* TODO: Maybe inside chat instead? */}
        <div class={{ header: true, hidden: chatContext.interactions?.length === 0 }}>
          {/* TODO: Maybe should be a orama-button variant? */}
          <button type="button" onClick={() => chatContext.chatService.resetChat()}>
            <ph-arrow-clockwise weight="fill" size="14" /> Clear chat
          </button>
        </div>
        <orama-chat style={{ display: 'flex' }} placeholder={this.placeholder} />
      </Host>
    )
  }
}
