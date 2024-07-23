import type { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import { spread } from '@open-wc/lit-helpers'
import type { Components } from '@orama/wc-components'

const meta: Meta<Components.OramaTextarea> = {
  title: 'Internal/Form',
  component: 'orama-textarea',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<Components.OramaTextarea>

export const TextArea: Story = {
  render: ({ minRows, maxRows, placeholder }) =>
    html`
  <orama-textarea min-rows="${minRows}" max-rows="${maxRows}" placeholder="${placeholder}">
    <div slot="adornment-start"><button>Start</button></div>
    <div slot="adornment-end"><button>End</button></div>
  </orama-textarea>
  `,
  args: {
    placeholder: 'Name',
    maxRows: 5,
    minRows: 1,
  },
}
