import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'

const demoIndexes = {
  orama: {
    api_key: 'LerNlbp6379jVKaPs4wt2nZT4MJZbU1J',
    endpoint: 'https://cloud.orama.run/v1/indexes/docs-orama-b3f5xd',
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

const meta: Meta = {
  title: 'Components/Public/ChatBox',
  component: 'orama-chat-box',
  tags: ['autodocs'],
  argTypes: {
    index: {
      options: Object.keys(demoIndexes),
      mapping: demoIndexes,
      control: { type: 'select' },
    },
  },
  parameters: {
    layout: 'set-height',
  },
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaChatBox>

export const ChatBox: Story = {
  args: {
    placeholder: 'What do you want to learn about Orama?',
    sourceBaseUrl: 'https://docs.orama.com',
    index: {
      api_key: demoIndexes.orama.api_key,
      endpoint: demoIndexes.orama.endpoint,
    },
    sourcesMap: {
      title: 'title',
      description: 'description',
      path: 'path',
    },
  },
}
