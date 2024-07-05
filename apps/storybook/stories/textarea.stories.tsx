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
  <orama-textarea placeholder='What do you want to learn about Orama?' max-rows=${args.maxRows} min-rows=${args.minRows} style="width: 600px;">
    <div slot="adornment-start">BTN</div>
    <div slot="adornment-end">BTN</div>
  </orama-textarea>
  `,
  args: {
    placeholder: 'Name',
    maxRows: 5,
    minRows: 1
  }
}
