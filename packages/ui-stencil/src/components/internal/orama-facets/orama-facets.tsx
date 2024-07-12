import { Component, h, Prop, State } from '@stencil/core'
import { searchState } from '@/context/searchContext'

@Component({
  tag: 'orama-facets',
  styleUrl: 'orama-facets.scss',
})

/**
 * The orama-facets component renders a list of facets
 */
export class OramaFacets {
  @Prop() facets: any[] // TODO: fix type

  @State() selected: string

  handleClick(facet: { name: string; count: number }) {
    this.selected = facet.name
    searchState.currentFacet = facet
  }

  render() {
    if (!this.facets || this.facets.length === 0) {
      return null
    }

    return (
      <ul class="facets-list">
        {this.facets?.map((facet) => {
          if (facet?.count === 0) {
            return
          }
          return (
            <li key={facet} class="facet">
              <button
                type="button"
                class={{
                  'facet-button': true,
                  'facet-button--selected': this.selected === facet?.name || (!this.selected && facet?.name === 'All'),
                }}
                onClick={() => this.handleClick(facet)}
              >
                {facet?.name}
                <span class="facet-count">{facet?.count}</span>
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
}
