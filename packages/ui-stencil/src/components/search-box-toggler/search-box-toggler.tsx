import { Component, Host, h } from '@stencil/core'
import { globalContext } from '@/context/GlobalContext'

@Component({
  tag: 'search-box-toggler',
  styleUrl: 'search-box-toggler.scss',
})
export class SearchBoxToggler {
  render() {
    return (
      <Host>
        <button
          type="button"
          onClick={() => {
            globalContext.open = !globalContext.open
          }}
        >
          Toggle
        </button>
      </Host>
    )
  }
}
