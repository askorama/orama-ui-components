import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'

const meta: Meta<Components.OramaChat> = {
  title: 'Components/Internal/Chat',
  component: 'orama-chat',
}

export default meta
type Story = StoryObj<Components.OramaChat>

export const Chat: Story = {
  args: {},
}
