import { Component, Host, h, Prop, Watch, State } from '@stencil/core'
import { chatContext } from '@/context/chatContext'
import { ChatService } from '@/services/ChatService'
import { initOramaClient } from '@/utils/utils'
import type { CloudIndexConfig, SourcesMap } from '@/types'
import '@phosphor-icons/webcomponents/dist/icons/PhArrowClockwise.mjs'
import { OramaClient } from '@oramacloud/client'

@Component({
  tag: 'orama-chat-box',
  styleUrl: 'orama-chat-box.scss',
  shadow: true,
})
export class ChatBox {
  @Prop() index?: CloudIndexConfig
  @Prop() instance?: OramaClient
  @Prop() sourceBaseUrl?: string
  @Prop() placeholder?: string
  @Prop() sourcesMap?: SourcesMap
  @Prop() suggestions?: string[]

  @State() oramaClient: OramaClient

  @Watch('index')
  indexChanged() {
    this.startChatService()
  }

  componentWillLoad() {
    this.startChatService()
  }

  startChatService() {
    if (this.index && this.instance) {
      throw new Error('You should pass only one between instance and index')
    }

    this.oramaClient = this.instance || initOramaClient(this.index)

    chatContext.chatService = new ChatService(this.oramaClient)
  }

  render() {
    if (!chatContext.chatService) {
      return <orama-text as="p">Unable to initialize chat service</orama-text>
    }

    return (
      // * Note: only dark theme supported at the moment
      <Host id="orama-ui-chatbox" class="theme-dark">
        <orama-chat
          placeholder={this.placeholder}
          sourceBaseUrl={this.sourceBaseUrl}
          sourcesMap={this.sourcesMap}
          suggestions={this.suggestions}
        />
      </Host>
    )
  }
}
