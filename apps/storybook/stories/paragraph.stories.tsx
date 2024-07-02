import type { StoryObj, Meta } from '@storybook/web-components'

const meta: Meta = {
  title: 'Internal/Typography',
  component: 'orama-p',
}

export default meta
type Story = StoryObj

const Template = (props) => {
  console.log(props)

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const element = document.createElement('orama-p') as any
  // add children
  const text = document.createTextNode('Hello World')
  element.appendChild(text)

  return element
}

export const Paragraph: Story = {
  render: Template,
  args: {
  },
};