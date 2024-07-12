import type { StoryObj, Meta } from '@storybook/web-components'

const meta: Meta = {
  title: 'Internal/OramaChat',
  component: 'orama-chat',
}

export default meta
type Story = StoryObj

const Template = (args) => {
  return `
  <div style="height: 800px; width: 360px; border: 1px solid white; display: flex; flex-direction: column;">
    <orama-chat ${{ ...args }}></orama-chat>
  </div>
  `
}

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const OramaChat: Story = {
  render: Template,
  args: {},
}
