import type { StoryObj, Meta } from '@storybook/web-components'

const meta: Meta = {
  title: 'Internal/OramaChat',
  component: 'orama-chat'
}

export default meta
type Story = StoryObj

const Template = (args) => {
  return `<orama-chat ${{...args}}></orama-chat>`
}

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Primary: Story = {
  render: Template,
  args: {}
}
