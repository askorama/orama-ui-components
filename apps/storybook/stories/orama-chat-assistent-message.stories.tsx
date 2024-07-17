import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from 'ui-stencil'

const meta: Meta<Components.OramaChatAssistentMessage> = {
  title: 'Internal/OramaChat',
  component: 'orama-chat-assistent-message',
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaChatAssistentMessage>

export const OramaChatAssistentMessage: Story = {
  args: {
    message: {
      role: 'assistant',
      content: 'Some assistent message with some content and some more content',
    },
  },
}
