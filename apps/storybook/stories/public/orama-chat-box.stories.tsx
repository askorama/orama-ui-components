import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'

const meta: Meta<Components.OramaChatBox> = {
  title: 'Public/ChatBox',
  component: 'orama-chat-box',
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaChatBox>

export const ChatBox: Story = {
  args: {
    cloudIndex: {
      api_key: 'yl2JSnjLNBV6FVfUWEyadpjFr6KzPiDR',
      endpoint: 'https://cloud.orama.run/v1/indexes/recipes-m7w9mm',
    },
  },
}
