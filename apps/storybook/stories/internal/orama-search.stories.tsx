import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'

const meta: Meta<Components.OramaSearch> = {
  title: 'Components/Internal/Search',
  component: 'orama-search',
}

export default meta
type Story = StoryObj<Components.OramaSearch>

// TODO: Add controls for props
export const Search: Story = {
  args: {},
}
