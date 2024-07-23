import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'

const meta: Meta<Components.OramaSearchButton> = {
  title: 'Public/SearchButton',
  component: 'orama-search-button',
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaSearchButton>

export const SearchButton: Story = {}
