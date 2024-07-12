// Create a story for the OramaFacets web component
import { h } from '@stencil/core'
import type { StoryObj, Meta } from '@storybook/web-components'

const meta: Meta = {
  title: 'Internal/Facets',
  component: 'orama-facets',
}

export default meta

type Story = StoryObj

const Template = (args) => {
  return `
  <div>
    <p>Something that uses facets</p>
    <orama-facets current-facet=${args.currentFacet} facets=${JSON.stringify(args.facets)}></orama-facets>
  </div>
  `
}

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Facets: Story = {
  render: Template,
  args: {
    facets: ['FacetOne', 'FacetTwo', 'FacetThree'],
    currentFacet: 'Facet 2',
  },
}
