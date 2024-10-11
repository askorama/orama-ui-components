import { Component, h, Prop, State, Listen, Element, Event, type EventEmitter, Watch } from '@stencil/core'

export type ModalStatus = {
  open: boolean
  id: HTMLElement
}
@Component({
  tag: 'orama-embed',
  styleUrl: 'orama-embed.scss',
  scoped: true,
})
export class OramaEmbed {
  @State() activeElement: HTMLElement

  @Element() el: HTMLElement

  render() {
    return (
      <div class="embed">
        <slot />
      </div>
    )
  }
}
