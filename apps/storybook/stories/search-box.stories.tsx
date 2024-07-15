import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'
type Story = StoryObj<Components.SearchBox>

const meta: Meta<Components.SearchBox> = {
  title: 'Public/SearchBox',
  component: 'search-box',
}
export default meta

export const SearchBox: Story = {
  args: {
    open: true,
    facetProperty: 'category',
    resultMap: {
      description: 'title',
    },
  },
}
