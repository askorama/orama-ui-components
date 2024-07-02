import { Component, h } from '@stencil/core'

@Component({
  tag: 'orama-p',
  styleUrl: 'typography.scss',
  shadow: false
})
export class Paragraph {
  render() {
    return (
      <p class='paragraph'>
        <slot></slot>
      </p>
    )
  }
}
