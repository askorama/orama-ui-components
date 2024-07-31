import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'

const meta: Meta<Components.OramaSearchButton> = {
  title: 'Components/SearchButton',
  component: 'orama-search-button',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaSearchButton>

export const SearchButton: Story = {}
