import type { Meta } from '@storybook/web-components'
import { html } from 'lit-html'
import demoIndexes from '../config'

const meta: Meta = {
  title: 'Components/ChatBox',
  component: 'orama-chat-box',
  argTypes: {
    preset: {
      options: Object.keys(demoIndexes),
      mapping: demoIndexes,
      control: { type: 'select' },
    },
    index: {
      control: { type: 'object' },
      table: {
        type: {
          summary: 'CloudIndexConfig',
          detail: `{
  api_key: string
  endpoint: string
}`,
        },
      },
    },
    sourceBaseUrl: {
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    sourcesMap: {
      table: {
        type: {
          summary: 'SourcesMap',
          detail: `{
  title?: string
  description?: string
  path?: string
}`,
        },
      },
    },
    suggestions: {
      table: {
        type: {
          summary: 'string[]',
        },
      },
    },
  },
  parameters: {
    layout: 'set-height',
  },
} satisfies Meta

export default meta

const Template = ({ preset }) => {
  return html`
    <orama-chat-box
      .index=${preset?.index}
      placeholder=${preset?.placeholder}
      sourceBaseUrl=${preset?.sourceBaseUrl}
      .sourcesMap=${preset?.sourcesMap}
      .suggestions=${preset?.suggestions}
    ></orama-chat-box>
  `
}

export const ChatBox = {
  render: Template,
  args: {
    preset: 'orama',
  },
}
