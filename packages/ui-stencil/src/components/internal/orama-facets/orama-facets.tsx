import { Component, h, Prop, Event, type EventEmitter } from '@stencil/core'
// import { searchState } from '@/context/searchContext'

@Component({
  tag: 'orama-facets',
  styleUrl: 'orama-facets.scss',
})

/**
 * The orama-facets component renders a list of facets
 */
export class OramaFacets {
  @Prop() facets: any[] // TODO: fix type
  @Prop() currentFacet: string
  @Event() facetSelected: EventEmitter<string>

  handleClick(facet: string) {
    this.facetSelected.emit(facet)
  }

  render() {
    if (!this.facets || this.facets.length === 0) {
      return null
    }

    return (
      <ul class="facets-list">
        {this.facets?.map((facet, key) => {
          if (facet?.count === 0) {
            return
          }
          return (
            <li key={facet} class="facet">
              <button
                type="button"
                class={{
                  'facet-button': true,
                  'facet-button--selected': facet === this.currentFacet || (!this.currentFacet && key === 0),
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
