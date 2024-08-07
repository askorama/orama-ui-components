import type { Meta } from '@storybook/web-components'
import demoIndexes from '../config'
import { html } from 'lit-html'

const meta: Meta = {
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

const Template = ({ preset, colorScheme }) => {
  return html`<orama-search-box
    open=${preset?.open}
    .facetProperty=${preset?.facetProperty}
    .resultMap=${preset?.resultMap}
    .colorScheme=${colorScheme}
    .themeConfig=${preset.themeConfig}
    .index=${preset.index}
    .suggestions=${preset?.suggestions}
  ></orama-search-box>`
}

export const SearchBox = {
  render: Template,
  args: {
    preset: 'orama',
  },
}
