import type { Meta, StoryObj } from '@storybook/web-components'
import type { Components } from '@orama/wc-components'
import demoIndexes from '../config'
import { html } from 'lit-html'
import type { DemoIndexConfig } from '../config'

const meta: Meta<Components.OramaSearchBox & { preset: keyof DemoIndexConfig }> = {
  title: 'Components/SearchBox',
  component: 'orama-search-box',
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
    colorScheme: {
      options: ['light', 'dark', 'system'],
      table: {
        defaultValue: { summary: 'light' },
      },
      control: { type: 'radio' },
    },
    disableChat: { type: 'boolean', defaultValue: false },
    themeConfig: {
      table: {
        type: {
          summary: 'Partial<TThemeOverrides>',
        },
      },
    },
  },
}
export default meta

// TODO: Poor controls: https://linear.app/oramasearch/issue/ORM-1823/poor-serachbox-storybook-controls
const Template = ({ preset, colorScheme }) => {
  return html`<orama-search-box
    .open=${preset?.open}
    .facetProperty=${preset?.facetProperty}
    .resultMap=${preset?.resultMap}
    .colorScheme=${colorScheme}
    .themeConfig=${preset.themeConfig}
    .index=${preset.index}
    .instance=${preset.instance}
    .suggestions=${preset?.suggestions}
    .sourceBaseUrl=${preset?.sourceBaseUrl}
    .sourcesMap=${preset?.sourcesMap}
    .disableChat=${preset?.disableChat}
  ></orama-search-box>`
}

type Story = StoryObj<Components.OramaSearchBox & { preset: keyof DemoIndexConfig }>

export const SearchBox: Story = {
  render: Template as any,
  args: {
    preset: 'orama',
  },
}
