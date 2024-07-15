// Create a story for the OramaFacets web component
import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'
import { fn } from '@storybook/test'

const meta: Meta<Components.OramaFacets> = {
  title: 'Internal/OramaFacets',
  component: 'orama-facets',
}

export default meta

type Story = StoryObj<Components.OramaFacets>

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const OramaFacets: Story = {
  args: {
    facets: [
      { name: 'FacetOne', count: 200 },
      { name: 'FacetTwo', count: 82 },
      { name: 'FacetThree', count: 74 },
    ],
    selectedFacet: 'FacetOne',
    onFacetClick: fn(),
  },
}
