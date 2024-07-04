import type { StoryObj, Meta } from '@storybook/html'

const meta = {
  title: 'Internal/Form',
  tags: ['autodocs']
} satisfies Meta

export default meta
type Story = StoryObj

export const TextArea: Story = {
  render: (args) =>
    `<orama-textarea name='test1' label='Small size input' size='small' placeholder='Blablablbal' max-rows='5'></orama-textarea>`,
  args: {
    placeholder: 'Name'
  }
}
