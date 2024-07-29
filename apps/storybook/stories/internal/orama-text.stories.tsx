import type { StoryObj, Meta } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import { spread } from '@open-wc/lit-helpers'
import { html } from 'lit-html'

const meta: Meta<Components.OramaText> = {
  title: 'Components/Internal/Typography',
  tags: ['autodocs'],

  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'small', 'a'],
    },
    styledAs: {
      control: { type: 'select' },
      options: ['p', 'span', 'small'],
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<Components.OramaText>

const Template = (content: string) => (args) =>
  html`
  <orama-text ${spread(args)}>${content}</orama-text>
`

export const Paragraph: Story = {
  render: Template('This is a paragraph'),
  args: {
    as: 'p',
    class: 'my-optional-class',
  },
}

export const Span: Story = {
  render: Template('This is a span'),
  args: {
    as: 'span',
    class: 'my-optional-class',
  },
}

export const Small: Story = {
  render: Template('This is a small'),
  args: {
    as: 'small',
    class: 'my-optional-class',
  },
}

export const Inactive: Story = {
  render: Template('This is an inactive paragraph'),
  args: {
    as: 'p',
    inactive: true,
  },
}
