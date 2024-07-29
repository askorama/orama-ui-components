import type { StoryObj, Meta } from '@storybook/html'
import type { Components } from '@orama/wc-components'

const meta: Meta<Components.OramaSearchResults> = {
  title: 'Components/Internal/SearchResults',
  component: 'orama-search-results',
}

export default meta
type Story = StoryObj<Components.OramaSearchResults>

export const NoResults: Story = {
  args: {
    sections: [{ section: undefined, items: [] }],
  },
}

export const WithResults: Story = {
  args: {
    sections: [
      {
        section: 'Section 1',
        items: [
          { id: 'id 1', score: 1, title: 'Title 1', description: 'Description 1', path: '../somePath' },
          { id: 'id 2', score: 1, title: 'Title 2', description: 'Description 2', path: '../somePath' },
          { id: 'id 3', score: 1, title: 'Title 3', description: 'Description 3', path: '../somePath' },
        ],
      },
      {
        section: 'Section 2',
        items: [
          { id: 'id 1', score: 1, title: 'Title 1', description: 'Description 1', path: '../somePath' },
          { id: 'id 2', score: 1, title: 'Title 2', description: 'Description 2', path: '../somePath' },
          { id: 'id 3', score: 1, title: 'Title 3', description: 'Description 3', path: '../somePath' },
        ],
      },
    ],
  },
}
