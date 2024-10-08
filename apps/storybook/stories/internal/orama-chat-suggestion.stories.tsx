import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import { fn } from '@storybook/test'

const meta: Meta<Components.OramaChatSuggestions> = {
  title: 'Components/Internal/Chat',
  component: 'orama-chat-suggestions',
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<Components.OramaChatSuggestions>

export const ChatSuggestions: Story = {
  args: {
    suggestions: [
      'Why is Orama better than other search or AI solutions?',
      'How does Orama ensure correct answers?',
      'What are the steps to implement?',
    ],
    suggestionClicked: fn(),
  },
}
