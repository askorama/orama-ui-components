import { Component, h, Prop, State, Listen, Element, Event, type EventEmitter, Watch } from '@stencil/core'

@Component({
  tag: 'orama-embed',
  styleUrl: 'orama-embed.scss',
  scoped: true,
})
export class OramaEmbed {
  render() {
    return (
      <div class="embed">
        <slot />
      </div>
    )
  }
}
