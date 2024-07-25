import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'

const demoIndexes = {
  orama: {
    api_key: '6kHcoevr3zkbBmC2hHqlcNQrOgejS4ds',
    endpoint: 'https://cloud.orama.run/v1/indexes/orama-docs-pgjign',
  },
  recipes: {
    api_key: 'yl2JSnjLNBV6FVfUWEyadpjFr6KzPiDR',
    endpoint: 'https://cloud.orama.run/v1/indexes/recipes-m7w9mm',
  },
  videogames: {
    api_key: 'WL7pKdEqCTPf3G2412x8ecneqVbnkklr',
    endpoint: 'https://cloud.orama.foo/v1/indexes/videogames-rk139h',
  },
}
const meta: Meta<Components.OramaChatBox> = {
  title: 'Public/ChatBox',
  component: 'orama-chat-box',
  argTypes: {
    index: {
      options: Object.keys(demoIndexes),
      mapping: demoIndexes,
      control: { type: 'select' },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaChatBox>

export const ChatBox: Story = {
  args: {
    index: {
      api_key: demoIndexes.orama.api_key,
      endpoint: demoIndexes.orama.endpoint,
    },
    placeholder: 'What do you want to learn about Orama?',
  },
}
