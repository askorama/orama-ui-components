import { Component, Host, h, Prop, Watch, State, Element } from '@stencil/core'
import { chatContext } from '@/context/chatContext'
import { ChatService } from '@/services/ChatService'
import { generateRandomID, initOramaClient, validateCloudIndexConfig } from '@/utils/utils'
import type { CloudIndexConfig, SourcesMap } from '@/types'
import type { OramaClient } from '@oramacloud/client'
import '@phosphor-icons/webcomponents/dist/icons/PhArrowClockwise.mjs'

@Component({
  tag: 'orama-chat-box',
  styleUrl: 'orama-chat-box.scss',
  shadow: true,
})
export class ChatBox {
  @Element() el: HTMLElement
  @Prop() index?: CloudIndexConfig
  @Prop() clientInstance?: OramaClient
  @Prop() sourceBaseUrl?: string
  @Prop() placeholder?: string
  @Prop() sourcesMap?: SourcesMap
  @Prop() suggestions?: string[]

  @State() oramaClient: OramaClient
  @State() componentID = generateRandomID('chat-box')

  @Watch('index')
  indexChanged() {
    this.startChatService()
  }

  componentWillLoad() {
    this.el.id = this.componentID
    this.startChatService()
  }

  startChatService() {
    validateCloudIndexConfig(this.el, this.index, this.clientInstance)
    this.oramaClient = this.clientInstance || initOramaClient(this.index)

    chatContext.chatService = new ChatService(this.oramaClient)
  }

  render() {
    if (!chatContext.chatService) {
      return <orama-text as="p">Unable to initialize chat service</orama-text>
    }

    return (
      // * Note: only dark theme supported at the moment
      <Host class="theme-dark">
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
