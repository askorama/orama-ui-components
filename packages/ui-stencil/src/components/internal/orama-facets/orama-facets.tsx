import { Component, h, Prop } from '@stencil/core'

// TODO: fix type
export type Facet = { name: string; count: number }

@Component({
  tag: 'orama-facets',
  styleUrl: 'orama-facets.scss',
})

/**
 * The orama-facets component renders a list of facets
 */
export class OramaFacets {
  @Prop() facets: Facet[]
  @Prop() selectedFacet: string
  @Prop() facetClicked: (facetName: string) => void

  handleClick(facet: Facet) {
    this.facetClicked(facet.name)
  }

  render() {
    if (!this.facets || this.facets.every((facet) => !facet.count)) {
      return null
    }

    return (
      <ul class="facets-list">
        {this.facets?.map((facet) => {
          if (facet?.count === 0) {
            return
          }
          return (
            <li key={facet.name} class="facet">
              <button
                type="button"
                class={{
                  'facet-button': true,
                  'facet-button--selected':
                    this.selectedFacet === facet?.name || (!this.selectedFacet && facet?.name === 'All'),
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
