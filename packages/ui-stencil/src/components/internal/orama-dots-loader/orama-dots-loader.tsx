import { Component, h } from '@stencil/core'

@Component({
  tag: 'orama-dots-loader',
  styleUrl: 'orama-dots-loader.scss',
  shadow: true,
})
export class DotsLoader {
  render() {
    return (
      <div class="dots-loader">
        <div class="dot" />
        <div class="dot" />
        <div class="dot" />
      </div>
    )
  }
}
