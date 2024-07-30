import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'

const meta: Meta<Components.OramaNavigationBar> = {
  title: 'Components/Internal/NavigationBar',
  component: 'orama-navigation-bar',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<Components.OramaNavigationBar>

export const NavigationBar: Story = {
  args: {},
}
