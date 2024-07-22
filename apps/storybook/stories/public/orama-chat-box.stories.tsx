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
    index: {
      api_key: '6kHcoevr3zkbBmC2hHqlcNQrOgejS4ds',
      endpoint: 'https://cloud.orama.run/v1/indexes/orama-docs-pgjign',
    },
  },
}
