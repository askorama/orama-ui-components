import type { StoryObj, Meta } from '@storybook/html'

const meta = {
  title: 'Internal/Form',
  tags: ['autodocs']
} satisfies Meta

export default meta
type Story = StoryObj

export const TextArea: Story = {
  render: (args) =>
    `
  <orama-textarea placeholder='What do you want to learn about Orama?' max-rows=${args.maxRows} min-rows=${args.minRows} style="width: 600px;" autofocus="true">
    <div slot="adornment-start"><button>Start</button></div>
    <div slot="adornment-end"><button>End</button></div>
  </orama-textarea>
  `,
  args: {
    placeholder: 'Name',
    maxRows: 5,
    minRows: 1
  }
}
