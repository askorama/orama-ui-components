// Create a story for the OramaFacets web component
import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import { fn } from '@storybook/test'

const meta: Meta<Components.OramaFacets> = {
  title: 'Components/Internal/Facets',
  component: 'orama-facets',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<Components.OramaFacets>

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Facets: Story = {
  args: {
    facets: [
      { name: 'FacetOne', count: 200 },
      { name: 'FacetTwo', count: 82 },
      { name: 'FacetThree', count: 74 },
    ],
    selectedFacet: 'FacetOne',
    facetClicked: fn(),
  },
}
