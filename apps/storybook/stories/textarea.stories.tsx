import type { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import { spread } from '@open-wc/lit-helpers'
import type { Components } from 'ui-stencil'

const meta: Meta<Components.OramaTextarea> = {
  title: 'Internal/Form',
  component: 'orama-textarea',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<Components.OramaTextarea>

export const TextArea: Story = {
  render: ({ ...args }) =>
    html`
  <orama-textarea ${spread(args)}>
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
