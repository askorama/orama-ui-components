import { Component, Host, h, Prop, Watch } from '@stencil/core'
import { chatContext } from '@/context/chatContext'
import { ChatService } from '@/services/ChatService'
import { initOramaClient } from '@/utils/utils'
import type { CloudIndexConfig, SourcesMap } from '@/types'
import '@phosphor-icons/webcomponents/dist/icons/PhArrowClockwise.mjs'

@Component({
  tag: 'orama-chat-box',
  styleUrl: 'orama-chat-box.scss',
  scoped: true,
})
export class ChatBox {
  @Prop() index: CloudIndexConfig
  @Prop() sourceBaseUrl?: string
  @Prop() placeholder?: string
  @Prop() sourcesMap?: SourcesMap

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
      // * Note: only dark theme supported at the moment
      <Host id="orama-ui-chatbox" class="theme-dark">
        <orama-chat placeholder={this.placeholder} sourceBaseUrl={this.sourceBaseUrl} sourcesMap={this.sourcesMap} />
      </Host>
    )
  }
}
