import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import { spread } from '@open-wc/lit-helpers'
import { html } from 'lit-html'

const meta: Meta<Components.OramaText> = {
  title: 'Components/Internal/Sliding Panel',
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaSlidingPanel>

const Template = (content: string) => (args) =>
  html`
  <orama-sliding-panel ${spread(args)}>
    <div style="padding: 20px;">
      <orama-text as='h2' styled-as='p' bold>Sliding Panel Title</orama-text>
      <orama-text>${content}</orama-text>
    </div>
  </orama-sliding-panel>
`

export const Panel: Story = {
  render: Template(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec elit lacinia tincidunt. Nullam nec purus nec elit lacinia tincidunt.',
  ),
  args: {
    open: true,
  },
}
