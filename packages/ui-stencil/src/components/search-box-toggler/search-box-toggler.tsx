import { Component, Host, h } from '@stencil/core'
import { searchState } from '@/context/searchContext'

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
            searchState.open = !searchState.open
          }}
        >
          Toggle
        </button>
      </Host>
    )
  }
}
