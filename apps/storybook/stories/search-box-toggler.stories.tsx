import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'

const meta: Meta<Components.SearchBoxToggler> = {
  title: 'Public/SearchBox',
  component: 'search-box-toggler',
} satisfies Meta

export default meta
type Story = StoryObj<Components.SearchBoxToggler>

export const SearchBoxToggler: Story = {}
