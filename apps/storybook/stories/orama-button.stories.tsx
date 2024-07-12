import type { StoryObj, Meta } from '@storybook/html'

const meta = {
  title: 'Internal/Button',
  component: 'orama-button',
} satisfies Meta

export default meta

type Story = StoryObj

const Template = (content: string) => (args) =>
  `
  <orama-button variant=${args.variant} class=${args.class}>${content}</orama-button>
`

export const Primary: Story = {
  render: Template('Primary button'),
  args: {
    variant: 'primary',
    class: 'my-optional-class',
    type: 'button',
  },
}
