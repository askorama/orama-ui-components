import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import { spread } from '@open-wc/lit-helpers'
import { html } from 'lit-html'

const meta: Meta<Components.OramaText> = {
  title: 'Components/Internal/Modal',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaModal>

const Template = (content: string) => (args) =>
  html`
  <orama-modal ${spread(args)}>
    <div style="padding: 20px;">
      <orama-text as='h2' styled-as='p' bold>Modal Title</orama-text>
      <orama-text>${content}</orama-text>
    </div>
  </orama-modal>
`

export const Modal: Story = {
  render: Template(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec elit lacinia tincidunt. Nullam nec purus nec elit lacinia tincidunt.',
  ),
  args: {
    open: true,
  },
}
