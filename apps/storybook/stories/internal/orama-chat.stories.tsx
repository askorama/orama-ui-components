import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'

const meta: Meta<Components.OramaChat> = {
  title: 'Internal/Chat',
  component: 'orama-chat',
}

export default meta
type Story = StoryObj<Components.OramaChat>

export const Chat: Story = {
  args: {},
}
