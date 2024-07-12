import type { StoryObj, Meta } from '@storybook/html'

const meta = {
  title: 'Internal/Search Results',
  component: 'orama-search-results',
} satisfies Meta

export default meta
type Story = StoryObj

const Template = (args) => `
  <orama-search-results items=${args.items} search-term='test'</orama-search-results>
`

export const NoResults: Story = {
  render: Template,
  args: {},
}

export const WithResults: Story = {
  render: Template,
  args: {
    items: [
      {
        id: '1',
        title: 'Title 1',
        description: 'Description 1',
      },
      {
        id: '2',
        title: 'Title 2',
        description: 'Description 2',
      },
    ],
  },
}
