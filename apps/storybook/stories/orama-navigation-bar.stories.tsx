import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'

const meta: Meta<Components.OramaNavigationBar> = {
  title: 'Internal/OramaNavigationBar',
  component: 'orama-navigation-bar',
}

export default meta
type Story = StoryObj<Components.OramaNavigationBar>

export const OramaNavigationBar: Story = {
  args: {},
}
