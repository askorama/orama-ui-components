import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import { fn } from '@storybook/test'

const meta: Meta<Components.OramaChatSuggestions> = {
  title: 'Internal/Chat',
  component: 'orama-chat-suggestions',
}

export default meta

type Story = StoryObj<Components.OramaChatSuggestions>

export const ChatSuggestions: Story = {
  args: {
    suggestions: ['How to get started?', 'What are the prices?', 'What is Orama?'],
    suggestionClicked: fn(),
  },
}
