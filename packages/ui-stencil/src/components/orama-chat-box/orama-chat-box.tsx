import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'orama-chat-box',
  styleUrl: 'orama-chat-box.scss',
  shadow: true,
})
export class ChatBox {
  render() {
    return (
      <Host>
        <orama-chat style={{ display: 'flex' }} />
      </Host>
    )
  }
}
