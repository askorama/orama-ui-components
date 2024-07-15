import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'

const meta: Meta<Components.OramaSearch> = {
  title: 'Internal/OramaSearch',
  component: 'orama-search',
}

export default meta
type Story = StoryObj<Components.OramaSearch>

// TODO: Add controls for props
export const OramaSearch: Story = {
  args: {},
}
