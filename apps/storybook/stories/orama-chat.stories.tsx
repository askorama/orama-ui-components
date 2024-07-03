import type { StoryObj, Meta } from '@storybook/web-components'

const meta: Meta = {
  title: 'Orama Chat',
  component: 'orama-chat'
}

export default meta
type Story = StoryObj

const Template = (props) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const element = document.createElement('orama-chat') as any

  for (const key of Object.keys(props)) {
    element[key] = props[key]
  }

  return element
}

// More on writing stories with args: https://storybook.js.org/docs/html/writing-stories/args
export const Primary: Story = {
  render: Template,
  args: {}
}
