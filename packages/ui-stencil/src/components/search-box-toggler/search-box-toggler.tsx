import { Component, Host, h } from '@stencil/core'
import { searchContext } from '../../context/searchContext'

@Component({
  tag: 'search-box-toggler',
  styleUrl: 'search-box-toggler.scss',
  shadow: true
})
export class SearchBoxToggler {
  render() {
    return (
      <Host>
        <button
          type="button"
          onClick={() => {
            searchContext.open = !searchContext.open
          }}
        >
          Toggle
        </button>
      </Host>
    )
  }
}
