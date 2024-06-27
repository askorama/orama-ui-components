import { Component, Host, h } from '@stencil/core'

@Component({
  tag: 'search-box',
  styleUrl: 'search-box.css',
  shadow: true
})
export class SearchBox {
  render() {
    return (
      <Host>
        <div>This is the searchbox</div>
      </Host>
    )
  }
}
