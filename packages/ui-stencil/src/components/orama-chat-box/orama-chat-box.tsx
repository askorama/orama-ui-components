import { Component, Host, h, Prop, Watch } from '@stencil/core'
import { chatContext } from '@/context/chatContext'
import { ChatService } from '@/services/ChatService'
import { initOramaClient } from '@/utils/utils'
import type { CloudIndexConfig } from '@/types'

@Component({
  tag: 'orama-chat-box',
  styleUrl: 'orama-chat-box.scss',
  shadow: true,
})
export class ChatBox {
  @Prop() index: CloudIndexConfig

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
      <Host id="orama-ui" class="theme-dark">
        <orama-chat style={{ display: 'flex' }} />
      </Host>
    )
  }
}
